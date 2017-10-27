jQuery.fn.dataTableExt.oApi.fnSetFilteringDelay = function (oSettings, iDelay) {
    var _that = this;
    if (iDelay === undefined ) {
        iDelay = 250;
    }
       
    this.each( function ( i ) {
        $.fn.dataTableExt.iApiIndex = i;
        var
            $this = this,
            oTimerId = null,
            sPreviousSearch = null,
            anControl = $( 'input', _that );
          //    console.log(anControl.length + " Controls Found");
            anControl.unbind( 'keyup' ).bind( 'keyup', function() {
            	
                var $$this = $this;
                var value = this.value;
                var index = $( 'input', _that ).index($(this));
            //    console.log("Running Keyup " +  this.value + " index " + $( 'input', _that ).index($(this)));
                 
                if (oTimerId != null) {
                //  console.log("clear timer...");
                     window.clearTimeout(oTimerId);
                }
                 
                oTimerId = window.setTimeout(function() {
                    $.fn.dataTableExt.iApiIndex = i;
                    // console.log("running filter " + value + " index " + $( 'input', _that ).index($(this)));
                    _that.fnFilter(value,index);
                 //   console.log("done running filter");
                }, iDelay);
        });
           
        return this;
    } );
    return this;
};