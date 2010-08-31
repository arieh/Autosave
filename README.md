Autosave
========
This Class supplies the basic interface for creating a form autosaver.
Whem attached, the class will priodicaly save the field's data. Also, when it's first attached, it will check if a record exist for the field and retrieve it automaticaly.

The base Class is an empty interface, that does no saving / retrieving. 
Currently, the is only one implementation of this interface - the Autosave.Request, but I hope to add more, such as a local storage implementation.

How to use
-----------
The base Autosave Class is only an interface for the autosave. For a working Class, you need to use the Autosave.Request. 

Anyway, Autosave.Request recieves 4 paramaters:

 1. element : a textfield to monitor. The element must have an ID.
 2. save-url : a url to use for the save action. More on this later.
 3. retrieve-url : a url to use for the retrieve action. More onthis later.
 4. options : an options object

Options:
----------
  * interval : how much time to wait between autoave checks in miliseconds. (defualt: 5000)
  * autostart : whether or not to start listening on the element automaticly. (default: false)
  * emptyUrl : a URL to use when emptying the records. 

So, all you really need to do on the client side is:

 
    #JS
    var as = new Autosave.Request('exp1','save.php','get.php',{emptyUrl:'empty.php'});
    
    as.attach();


As for the server side, you can look at the provided demo to see a very simple implementation of this. Following here is the expected server side behavior:
  
Saving data
-------------
When saving data, the following data will be sent to the server:

  * id : the element id
  * value : the new value to save
  * setp : a step identifier for the current save. 
  * action : what action is being performed. Will always be set to 'save'.

The request method for saving data will always be POST.

Retrieving data
----------------
When retrieving data, the following data will be sent to the server:

  * id : the element id
  * setp : a step identifier. This can be used to request a specific step. The default value will be set to -1, which means - "get me the newest step in the stack".
  * action : what action is being performed. Will always be set to 'get'.
  
The request will be using GET, and will expect the following JSON object:

    #JS
    {
          value : '' //the retrieved value
        , step : 0 //the step returned
    }  

Emtying Data
----------------
You can optionaly set a url to use when emptying the stack. If stack is not emptied, the newest data in it will be used when next the field is initialized.
The request uses POST, as passes the element's id as a paramater. 

