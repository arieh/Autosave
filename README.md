Autosave
========
This Class supplies the basic interface for creating a form autosaver.
Whem attached, the class will priodicaly save the field's data. Also, when it's first attached, it will check if a record exist for the field and retrieve it automaticaly.

The base Class is an empty interface, that does no saving / retrieving. 
Currently, there are 2 implementaions:

  * Autosave.Request : an AJAX implementation
  * Autosave.Storage : a local storage implementation, using [MooStorage](http://mootools.net/forge/p/storage)

How to use
-----------
For construction, each implementation has a bit different parameters. Both the base and Autosave.Local use the following constructor:

    #JS
    var AU = new Autosave.Local(el,options);
    
Reuqest uses a couple more parameters:

    #JS
    var AU = new Autosave.Reuqest(el,saveUrl,retreiveUrl,options);


 1. element : a textfield to monitor. The element must have an ID.
 2. save-url : a url to use for the save action. More on this later.
 3. retrieve-url : a url to use for the retrieve action. More onthis later.
 4. options : an options object

Options:
----------
  * interval : how much time to wait between autoave checks in miliseconds. (defualt: 5000)
  * autostart : whether or not to start listening on the element automaticly. (default: false)
  
Request adds this option:
  
  * emptyUrl : a URL to use when emptying the records. 
  
And storage also takes all of MooStorage options as well.

After constructing the autosaver, you might also need to call the attach method (by default), and than you are off to go. 

For more on how to use the Request modoule, and what you will need on the server side, read the docs.

