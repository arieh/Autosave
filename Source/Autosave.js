(function($,window,undef){

window['Autosave'] = new Class({
    Implements:[Options,Events]
    , options : {
        interval : 5000
        , autostart : false
    }
    , element : null
    , handle : null
    , current : ''
    , step : 0
    , id : false
    ,initialize : function(el,options){
        this.setOptions(options);
        this.element = $(el);
        this.id = this.element.get('id');
        
        if (!this.id) throw "Element Must Have ID!";
        
        if (this.options.autostart) this.attach();
    }
    , attach : function(){
        var $this = this,  data = this.retrieveData(this.id);
        
        if (data){
           this.current = this.element.value = data.value;
           this.step = data.step; 
        }
        
        function check(){
            if ($this.element.value != $this.current) $this.save($this.element.value);
        }
        
        this.handle = check.periodical(this.options.interval);
    }
    , detach : function(){$clear(this.handle);}
    , save : function(value){this.step++;}
    , retrieveData : function(id){
        return {value: '', step : 0}
    }
    , empty : function(){}
    , toElement : function(){return this.element;}
});

window['Autosave'].Request = new Class({
    Extends : Autosave
    , options : {
        emptyUrl : ''
    }
    , saveReq : null
    , saveUrl : ''
    , retrieveUrl :''
    , ongoing : false
    , initialize : function(el,save,retrieve,options){     
        options = options || {};
        
        var $this = this;
        
        this.saveUrl = save;
        this.retrieveUrl = retrieve;
        
        this.saveReq = new Request.JSON($merge(options,{url:save}));
        this.saveReq.addEvent('complete',function(){$this.ongoing = false;});
        
        this.parent(el,options);
    }
    , save : function(value){
        var $this = this;

        if (this.ongoing){
            this.saveReq.cancel();
        }
        this.ongoing = true;
        
        this.saveReq.send({
            data : {
                id : this.id
                , value : value
                , step : ++this.step
            }        
        });
        
        this.current = value;
    }
    , retrieveData : function(id,step){
        if (!step) step = -1;
      
        var new_value = {}
            , $this = this
            , req = new Request.JSON({
                url : this.retrieveUrl
                , async : false
                , onComplete : function(json){
                    new_value = {
                         value : json.value || ''
                       , step  : json.step || 0
                    };
                    new_value.step = new_value.step.toInt();
                }
            });
        
        req.send({
            data : {
                id : id
                , step :step
            }
        });
        
        return new_value;
    }
    , empty :function(){
        this.current = '';
        this.step = 0;
        
        if (this.options.emptyUrl) new Request({
            url : this.options.emptyUrl
            , data : {
                id : this.id
            }
            , async : false
        }).send();
        this.element.value = '';
        this.step = 0;
        return this;
    }
})

})(document.id,this)