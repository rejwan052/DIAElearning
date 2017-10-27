 
/* =============================================================================
   PRELOADER
   ========================================================================== */

    jQuery("body.single").prepend('<div id="preloader"></div>');
    jQuery("body.archive").prepend('<div id="preloader"></div>');
    jQuery("body.search").prepend('<div id="preloader"></div>');


    jQuery(window).load(function() {
        jQuery("#preloader").remove();
    });


/* =============================================================================
   NAVIGATION
   ========================================================================== */
    $(function(){
        
        $('#navigation_horiz').naviDropDown({
            dropDownWidth: '300px'
        });
        
    });

	$(function () {

        $('#nav').tinyNav({
        active: 'selected',
        header: 'Menu',
        label: ''
        });

	});



/* =============================================================================
   COLLAPSIBLE BOXES CONTRIBUTOR
   ========================================================================== */
 
                $('.trigger').not('.trigger_active').next('.toggle_container').hide();
                $('.trigger').click( function() {
                var trig = $(this);
	                if ( trig.hasClass('trigger_active') ) {
		                trig.next('.toggle_container').slideToggle('fast');
		                trig.removeClass('trigger_active');
		            } else {
		                $('.trigger_active').next('.toggle_container').slideToggle('fast');
		                $('.trigger_active').removeClass('trigger_active');
		                trig.next('.toggle_container').slideToggle('fast');
		                trig.addClass('trigger_active');
	                };
	                return false;
                });

/* =============================================================================
   SCROLLTO CONTRIBUTOR
   ========================================================================== */

	$('.contributercontent a').click(function(){
    
        var el = $(this).attr('href');
        var elWrapped = $(el);
        
        scrollToDiv(elWrapped,40);
        
        return false;
    
    });
    
    function scrollToDiv(element,navheight){
    
        
    
        var offset = element.offset();
        var offsetTop = offset.top;
        var totalScroll = offsetTop-navheight;
        
        $('body,html').animate({
                scrollTop: totalScroll
        }, 500);
    
    }


/* =============================================================================
   Disable Right Click Context Menu
   ========================================================================== */

	$('img').bind('contextmenu', function(e){
	    return false;
	}); 


/* =============================================================================
   CLEARFORM
   ========================================================================== */
	
	$('.clearform').focus(function(event) {
	
		  // Erase text from inside textarea
		$(this).text("");
	
		  // Disable text erase
		$(this).unbind(event);
	});


/* =============================================================================
   GALLERY TO SLIDESHOW
   ========================================================================== */

	    $("div.gallery-to-slideshow-wrapper").mouseenter(function() {
		    $("div.gallery-to-slideshow .slides").css("opacity","0.99");
		    $("div.gallery-to-slideshow-wrapper .slider-navi").css("opacity","0.99");
		});
		$("div.gallery-to-slideshow-wrapper").mouseleave(function() {
		    $("div.gallery-to-slideshow .slides").css("opacity","0.87");
		    $("div.gallery-to-slideshow-wrapper .slider-navi").css("opacity","0");
		});

		$("div.wpv_postvote").mouseenter(function() {
		    $("div.gallery-to-slideshow .slides").css("opacity","0.87");
		});


/* =============================================================================
   ASCENSOR
   ========================================================================== */
   
			$(document).ready(function() {
				//google code prettyfier
				prettyPrint();
			
				//ascensor
				$('#content').ascensor({
					AscensorName:'inspiration',
					WindowsFocus:true,
					WindowsOn:0,
					
					NavigationDirection:'xy',
					Direction: 'y',
					Navig:false,
					Link:false,
					ReturnURL:true,
					PrevNext:true,
					CSSstyles:false,
					
					KeyArrow:true,
					keySwitch:true,
					ReturnCode:false,
					
					ChocolateAscensor:false,
					AscensorMap: '1|7',
					ContentCoord: '1|1 & 1|2 & 1|3 & 1|4 & 1|5 & 1|6 & 1|7'
				});
			
			});
			
			

/* =============================================================================
   TOGGLE SLIDE
   ========================================================================== */			
			
			$(document).ready(function() {
	
															
				$("a.ToggleMenubar").click().toggle(function() {


								$('#menubar-content').animate({
									width: 'show',
									opacity: 'show'
								}, 'slow');
								

								}, function() {

								$('#menubar-content').animate({
									width: 'hide',
									opacity: 'hide'
								}, 'slow');



				});
				
			
		});
			
			
			
/* =============================================================================
   BACKGROUNDS
   ========================================================================== */	
			$(document).ready(function() {  
									
			
								

			var theWindow        = $(window),
				$bg              = $(".bg"),
				aspectRatio      = $bg.width() / $bg.height();
		
			function resizeBg() {
		
				if ( (theWindow.width() / theWindow.height()) < aspectRatio ) {
					$bg
						.removeClass()
						.addClass('bgheight');
				} else {
					$bg
						.removeClass()
						.addClass('bgwidth');
				}
			}
		
			theWindow.resize(function() {
				resizeBg();
			}).trigger("resize");
			
			
			
		
		});


/* =============================================================================
   CLICKABLE DIV
   ========================================================================== */	
			
		$(".boxlink").click(function(){
			 window.location=$(this).find("a").attr("href"); 
			 return false;
		});

/* =============================================================================
   DROPDOWN
   ========================================================================== */

(function($){

  $.fn.naviDropDown = function(options) {  
  
	//set up default options 
	var defaults = { 
		dropDownClass: 'dropdown', //the class name for your drop down
		dropDownWidth: 'auto',	//the default width of drop down elements
		slideDownEasing: 'easeInOutCirc', //easing method for slideDown
		slideUpEasing: 'easeInOutCirc', //easing method for slideUp
		slideDownDuration: 500, //easing duration for slideDown
		slideUpDuration: 500, //easing duration for slideUp
		orientation: 'horizontal' //orientation - either 'horizontal' or 'vertical'
	}; 
  	
	var opts = $.extend({}, defaults, options); 	

    return this.each(function() {  
	  var $this = $(this);
	  $this.find('.'+opts.dropDownClass).css('width', opts.dropDownWidth).css('display', 'none');
	  
	  var buttonWidth = $this.find('.'+opts.dropDownClass).parent().width() + 'px';
	  var buttonHeight = $this.find('.'+opts.dropDownClass).parent().height() + 'px';
	  if(opts.orientation == 'horizontal') {
		$this.find('.'+opts.dropDownClass).css('left', '0px').css('top', buttonHeight);
	  }
	  if(opts.orientation == 'vertical') {
		$this.find('.'+opts.dropDownClass).css('left', buttonWidth).css('top', '0px');
	  }
	  
	  $this.find('li').hoverIntent(getDropDown, hideDropDown);
    });
	
	function getDropDown(){
		activeNav = $(this);
		showDropDown();
	}
	
	function showDropDown(){
		activeNav.find('.'+opts.dropDownClass).slideDown({duration:opts.slideDownDuration, easing:opts.slideDownEasing});
	}
	
	function hideDropDown(){
		activeNav.find('.'+opts.dropDownClass).slideUp({duration:opts.slideUpDuration, easing:opts.slideUpEasing});//hides the current dropdown
	}
	
  };
})(jQuery);


/* =============================================================================
   TINY NAV
   ========================================================================== */	

/*! http://tinynav.viljamis.com v1.1 by @viljamis */
(function ($, window, i) {
  $.fn.tinyNav = function (options) {

    // Default settings
    var settings = $.extend({
      'active' : 'selected', // String: Set the "active" class
      'header' : '', // String: Specify text for "header" and show header instead of the active item
      'label'  : '' // String: sets the <label> text for the <select> (if not set, no label will be added)
    }, options);

    return this.each(function () {

      // Used for namespacing
      i++;

      var $nav = $(this),
        // Namespacing
        namespace = 'tinynav',
        namespace_i = namespace + i,
        l_namespace_i = '.l_' + namespace_i,
        $select = $('<select/>').attr("id", namespace_i).addClass(namespace + ' ' + namespace_i);

      if ($nav.is('ul,ol')) {

        if (settings.header !== '') {
          $select.append(
            $('<option/>').text(settings.header)
          );
        }

        // Build options
        var options = '';

        $nav
          .addClass('l_' + namespace_i)
          .find('a.mobilenav')
          .each(function () {
            options += '<option value="' + $(this).attr('href') + '">';
            var j;
            for (j = 0; j < $(this).parents('ul, ol').length - 1; j++) {
              options += '- ';
            }
            options += $(this).text() + '</option>';
          });

        // Append options into a select
        $select.append(options);

        // Select the active item
        if (!settings.header) {
          $select
            .find(':eq(' + $(l_namespace_i + ' li')
            .index($(l_namespace_i + ' li.' + settings.active)) + ')')
            .attr('selected', true);
        }

        // Change window location
        $select.change(function () {
          window.location.href = $(this).val();
        });

        // Inject select
        $(l_namespace_i).after($select);

        // Inject label
        if (settings.label) {
          $select.before(
            $("<label/>")
              .attr("for", namespace_i)
              .addClass(namespace + '_label ' + namespace_i + '_label')
              .append(settings.label)
          );
        }

      }

    });

  };
})(jQuery, this, 0);


/* =============================================================================
   HOVER INTENT
   ========================================================================== */	


(function($){$.fn.hoverIntent=function(f,g){var cfg={sensitivity:7,interval:100,timeout:0};cfg=$.extend(cfg,g?{over:f,out:g}:f);var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if((Math.abs(pX-cX)+Math.abs(pY-cY))<cfg.sensitivity){$(ob).unbind("mousemove",track);ob.hoverIntent_s=1;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=0;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var p=(e.type=="mouseover"?e.fromElement:e.toElement)||e.relatedTarget;while(p&&p!=this){try{p=p.parentNode;}catch(e){p=this;}}if(p==this){return false;}var ev=jQuery.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}if(e.type=="mouseover"){pX=ev.pageX;pY=ev.pageY;$(ob).bind("mousemove",track);if(ob.hoverIntent_s!=1){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).unbind("mousemove",track);if(ob.hoverIntent_s==1){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.mouseover(handleHover).mouseout(handleHover);};})(jQuery);



/* =============================================================================
   SCROLL TO
   ========================================================================== */
   
;(function( $ ){
	
	var $scrollTo = $.scrollTo = function( target, duration, settings ){
		$(window).scrollTo( target, duration, settings );
	};

	$scrollTo.defaults = {
		axis:'xy',
		duration: parseFloat($.fn.jquery) >= 1.3 ? 0 : 1
	};

	// Returns the element that needs to be animated to scroll the window.
	// Kept for backwards compatibility (specially for localScroll & serialScroll)
	$scrollTo.window = function( scope ){
		return $(window)._scrollable();
	};

	// Hack, hack, hack :)
	// Returns the real elements to scroll (supports window/iframes, documents and regular nodes)
	$.fn._scrollable = function(){
		return this.map(function(){
			var elem = this,
				isWin = !elem.nodeName || $.inArray( elem.nodeName.toLowerCase(), ['iframe','#document','html','body'] ) != -1;

				if( !isWin )
					return elem;

			var doc = (elem.contentWindow || elem).document || elem.ownerDocument || elem;
			
			return $.browser.safari || doc.compatMode == 'BackCompat' ?
				doc.body : 
				doc.documentElement;
		});
	};

	$.fn.scrollTo = function( target, duration, settings ){
		if( typeof duration == 'object' ){
			settings = duration;
			duration = 0;
		}
		if( typeof settings == 'function' )
			settings = { onAfter:settings };
			
		if( target == 'max' )
			target = 9e9;
			
		settings = $.extend( {}, $scrollTo.defaults, settings );
		// Speed is still recognized for backwards compatibility
		duration = duration || settings.speed || settings.duration;
		// Make sure the settings are given right
		settings.queue = settings.queue && settings.axis.length > 1;
		
		if( settings.queue )
			// Let's keep the overall duration
			duration /= 2;
		settings.offset = both( settings.offset );
		settings.over = both( settings.over );

		return this._scrollable().each(function(){
			var elem = this,
				$elem = $(elem),
				targ = target, toff, attr = {},
				win = $elem.is('html,body');

			switch( typeof targ ){
				// A number will pass the regex
				case 'number':
				case 'string':
					if( /^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(targ) ){
						targ = both( targ );
						// We are done
						break;
					}
					// Relative selector, no break!
					targ = $(targ,this);
				case 'object':
					// DOMElement / jQuery
					if( targ.is || targ.style )
						// Get the real position of the target 
						toff = (targ = $(targ)).offset();
			}
			$.each( settings.axis.split(''), function( i, axis ){
				var Pos	= axis == 'x' ? 'Left' : 'Top',
					pos = Pos.toLowerCase(),
					key = 'scroll' + Pos,
					old = elem[key],
					max = $scrollTo.max(elem, axis);

				if( toff ){// jQuery / DOMElement
					attr[key] = toff[pos] + ( win ? 0 : old - $elem.offset()[pos] );

					// If it's a dom element, reduce the margin
					if( settings.margin ){
						attr[key] -= parseInt(targ.css('margin'+Pos)) || 0;
						attr[key] -= parseInt(targ.css('border'+Pos+'Width')) || 0;
					}
					
					attr[key] += settings.offset[pos] || 0;
					
					if( settings.over[pos] )
						// Scroll to a fraction of its width/height
						attr[key] += targ[axis=='x'?'width':'height']() * settings.over[pos];
				}else{ 
					var val = targ[pos];
					// Handle percentage values
					/*attr[key] = val.slice && val.slice(-1) == '%' ? 
						parseFloat(val) / 100 * max
						: val;*/
				}

				// Number or 'number'
				if( /^\d+$/.test(attr[key]) )
					// Check the limits
					attr[key] = attr[key] <= 0 ? 0 : Math.min( attr[key], max );

				// Queueing axes
				if( !i && settings.queue ){
					// Don't waste time animating, if there's no need.
					if( old != attr[key] )
						// Intermediate animation
						animate( settings.onAfterFirst );
					// Don't animate this axis again in the next iteration.
					delete attr[key];
				}
			});

			animate( settings.onAfter );			

			function animate( callback ){
				$elem.animate( attr, duration, settings.easing, callback && function(){
					callback.call(this, target, settings);
				});
			};

		}).end();
	};
	
	// Max scrolling position, works on quirks mode
	// It only fails (not too badly) on IE, quirks mode.
	$scrollTo.max = function( elem, axis ){
		var Dim = axis == 'x' ? 'Width' : 'Height',
			scroll = 'scroll'+Dim;
		
		if( !$(elem).is('html,body') )
			return elem[scroll] - $(elem)[Dim.toLowerCase()]();
		
		var size = 'client' + Dim,
			html = elem.ownerDocument.documentElement,
			body = elem.ownerDocument.body;

		return Math.max( html[scroll], body[scroll] ) 
			 - Math.min( html[size]  , body[size]   );
			
	};

	function both( val ){
		return typeof val == 'object' ? val : { top:val, left:val };
	};

})( jQuery );


/* =============================================================================
   ASCENSOR
   ========================================================================== */

//**********************************************************************************************
//
//		ASCENSOR 1.0
//		CREDIT: LEO GALLEY
//		KIRKAS.CH
//
//			INDEX
// 				1. CREATION OF SEVERAL VARIABLES AND ADJUSTMENT OF LARGE CONTAINER
// 				2. DEFINITION AND PLACEMENT OF CHILDREN OF THE CONTAINER, + SCROLL OF MANAGEMENT
// 				3. POSITIONING OF CONTENTS (UPSTAIRS)
// 				4. CREATING LINKS
// 				5. CREATING NAVIGATION
//				6. CREATING PREV/NEXT BUTTON
// 				7. RESIZE MANAGEMENT
// 				8. KEY MANAGEMENT
// 				9. FRIENDLY CODE MODE MANAGEMENT
// 				10. TARGET MANAGEMENT
//				
//**********************************************************************************************

(function($){$.fn.ascensor=function(params){var params=$.extend({AscensorName:"maison",WindowsFocus:true,WindowsOn:0,NavigationDirection:"xy",Direction:"y",Navig:true,Link:true,PrevNext:true,KeyArrow:false,keySwitch:false,CSSstyles:true,ReturnURL:true,ReturnCode:false,ChocolateAscensor:false,AscensorMap:"4|3",ContentCoord:"1|1 & 2|2 & 1|2 & 3|4 & 1|3 & 3|1 & 2|3 & 2|1"},params);var trueURL=params.WindowsOn;var type=params.AscensorName.length;var url=location.href;var value=url.substring(url.lastIndexOf("/")+
1);var valueLenght=value.length;var OriginLength=params.AscensorName.length;var windowsNumber=value.split(params.AscensorName);var WindowsFinal=parseInt(windowsNumber[1]);if(value!=0&&valueLenght==OriginLength+1)params.WindowsOn=WindowsFinal;var PageNumber=0;var windowsHeight=$(window).height();var windowsWidth=$(window).width();var node=$(this);var resultatPage='<p>every page has the class ".'+params.AscensorName+'"';var resultatLink="";var resultatNav='<p>every navigation button has the class ".'+
params.AscensorName+'NavigationButton"</br></br>';var MapName=params.AscensorMap;var MapeCoupe=MapName.split("|");var MapWidth=parseInt(MapeCoupe[0]);var MapHeight=parseInt(MapeCoupe[1]);$(node).css("width",MapWidth*windowsWidth);$(node).css("height",MapHeight*windowsHeight);$(node).children("div").each(function(index){PageNumber+=1;$(this).addClass(params.AscensorName);$(this).attr("id",params.AscensorName+index);$(this).height(windowsHeight);$(this).width(windowsWidth);resultatPage+="<p>the id of the content "+
index+' is "#'+params.AscensorName+index+'" </p>';if($(this).children().height()>windowsHeight)$(this).css({"overflow-y":"scroll"});else $(this).css({"overflow-y":"hidden"});if($(this).children().width()>windowsWidth)$(this).css({"overflow-x":"scroll"});else $(this).css({"overflow-x":"hidden"})});if(params.Direction=="x"&&params.ChocolateAscensor==false)$(node).children("div").each(function(index){var PageAscensor=$(this).attr("id");var PageCoupe=PageAscensor.split(params.AscensorName);var PageFinal=
parseInt(PageCoupe[1]);$(this).css("position","absolute");$(this).css("left",windowsWidth*PageFinal)});else if(params.Direction=="y"&&params.ChocolateAscensor==false)$(node).children("div").each(function(index){var PageAscensor=$(this).attr("id");var PageCoupe=PageAscensor.split(params.AscensorName);var PageFinal=parseInt(PageCoupe[1]);$(this).css("position","absolute");$(this).css("top",windowsHeight*PageFinal)});else if(params.Direction=="y"&&params.ChocolateAscensor==true||params.Direction=="x"&&
params.ChocolateAscensor==true)$(node).children("div").each(function(index){var CoordName=params.ContentCoord;var CoordCoupe=CoordName.split(" & ");var CoordoneUne=CoordCoupe[index];var Coord=CoordoneUne.split("|");var CoordX=parseInt(Coord[1])-1;var CoordY=parseInt(Coord[0])-1;$(this).css("margin-top",function(index){return CoordY*windowsHeight});$(this).css("margin-left",function(index){return CoordX*windowsWidth});$(this).css("position","absolute")});if(params.Link==true)$(node).children("div").each(function(index){var Link=
index+1;$(this).append('<a href="#'+params.AscensorName+Link+'" rel="ConcentLink" class="'+params.AscensorName+"Link"+index+'">liens'+index+"</a>");resultatLink+='&lt;a href="#'+params.AscensorName+Link+'" rel="ConcentLink" class="'+params.AscensorName+"Link"+index+'"&gt;liens'+index+"&lt;/a&gt;</br>"});$("a").click(function(){if($(this).attr("rel")=="ConcentLink"){jQuery("html,body").queue([]).stop();var IdName=$(this).attr("class");var NameCoupe=IdName.split(params.AscensorName+"Link");var NumberFinal=
parseInt(NameCoupe[1])+1;if(NumberFinal>PageNumber-1)NumberFinal=0;params.WindowsOn=NumberFinal;$.scrollTo($("."+params.AscensorName+":eq("+NumberFinal+")"),1E3,{axis:params.NavigationDirection,onAfter:function(){if(params.ReturnURL==true)if(trueURL==NumberFinal)window.location.href="#/"+params.AscensorName+"0";else window.location.href="#/"+params.AscensorName+NumberFinal}});if(params.CSSstyles==true){$("."+params.AscensorName+"NavigationButton").css("background","rgba(255,255,255,0.9)");$("."+params.AscensorName+
"NavigationButton:eq("+params.WindowsOn+")").css("background","#ffa800")}return false}});if(params.Navig==true){$(node).append('<dl id="'+params.AscensorName+'Navigation"></dl>');resultatNav+='&lt;dl id="'+params.AscensorName+'Navigation"&gt;</br>';$(node).children("div").each(function(index){$("#"+params.AscensorName+"Navigation").append('<dt class="'+params.AscensorName+'NavigationButton" ><a href="#" title="Link for Content"  id="'+params.AscensorName+"NavigationButton"+index+'"></a></dt>').find("dt:eq("+
params.WindowsOn+")").css("background","#ffa800");resultatNav+='&lt;dt class="'+params.AscensorName+'NavigationButton" &gt;&lt;a href="#" title="Link for Content"  id="'+params.AscensorName+"NavigationButton"+index+'"&gt;&lt;/a&gt;&lt;/dt&gt;</br>'});resultatNav+="&lt;/dl&gt;"}if(params.CSSstyles==true){$("#"+params.AscensorName+"Navigation dt").css({"z-index":"20000","position":"fixed","width":"15px","height":"12px","background":"rgba(255,255,255,0.9)"});$("#"+params.AscensorName+"Navigation dt:eq("+
params.WindowsOn+")").css({"background":"#ffa800"});if(params.ChocolateAscensor==true)$("#"+params.AscensorName+"Navigation").find("dt").each(function(index){var CoordNameNav=params.ContentCoord;var CoordCoupeNav=CoordNameNav.split(" & ");var CoordoneUneNav=CoordCoupeNav[index];var CoordNav=CoordoneUneNav.split("|");var CoordNavX=parseInt(CoordNav[1])-1;var CoordNavY=parseInt(CoordNav[0])-1;var positionY=MapHeight*20;var positionX=MapWidth*700;$(this).css("bottom",function(){return-1*CoordNavY*10+
positionY});$(this).css("right",function(){return-1*CoordNavX*300+positionX})});else $("#"+params.AscensorName+"Navigation").find("dt").each(function(index){$(this).css("bottom",function(){return index*1})})}$("."+params.AscensorName+"NavigationButton").click(function(){jQuery("html,body").queue([]).stop();var EtageAscensor=$(this).find("a").attr("id");var EtageCoupe=EtageAscensor.split(""+params.AscensorName+"NavigationButton");var AscensorFinal=parseInt(EtageCoupe[1]);params.WindowsOn=AscensorFinal;
$.scrollTo($("."+params.AscensorName+":eq("+AscensorFinal+")"),1E3,{axis:params.NavigationDirection,onAfter:function(){if(params.ReturnURL==true)if(trueURL==AscensorFinal)window.location.href="#/"+params.AscensorName+"0";else window.location.href="#/"+params.AscensorName+AscensorFinal}});if(params.CSSstyles==true){$("."+params.AscensorName+"NavigationButton").css("background","rgba(255,255,255,0.9)");$(this).css("background","#ffa800")}});if(params.PrevNext==true)$(node).append('<a id="'+params.AscensorName+
'Prev"  href="?">&uarr;</a><a id="'+params.AscensorName+'Next" href="?">&darr;</a>');$("#"+params.AscensorName+"Prev").click(function(){jQuery("html,body").queue([]).stop();var windowsON=params.WindowsOn;var PrevWindows=windowsON-1;if(PrevWindows<0)PrevWindows=PageNumber-1;$.scrollTo($("#"+params.AscensorName+PrevWindows),1E3,{axis:params.NavigationDirection,onAfter:function(){if(params.ReturnURL==true)if(trueURL==PrevWindows)window.location.href="#/"+params.AscensorName+"0";else window.location.href=
"#"+params.AscensorName+PrevWindows}});params.WindowsOn=PrevWindows;if(params.CSSstyles==true){$("."+params.AscensorName+"NavigationButton").css("background","rgba(255,255,255,0.9)");$("."+params.AscensorName+"NavigationButton:eq("+params.WindowsOn+")").css("background","#ffa800")}return false});if(params.CSSstyles==true)$("#"+params.AscensorName+"Prev").css({"position":"fixed","z-index":"20000","top":"20px","left":"30px","background":"#ccc","color":"333","padding":"10px"});if(params.CSSstyles==true)$("#"+
params.AscensorName+"Next").css({"position":"fixed","z-index":"20000","top":"20px","left":"90px","background":"#ccc","color":"333","padding":"10px"});$("#"+params.AscensorName+"Next").click(function(){jQuery("html,body").queue([]).stop();var windowsON=params.WindowsOn;var NextWindows=windowsON+1;if(NextWindows>PageNumber-1)NextWindows=0;$.scrollTo($("#"+params.AscensorName+NextWindows),1E3,{axis:params.NavigationDirection,onAfter:function(){if(params.ReturnURL==true)if(trueURL==NextWindows)window.location.href=
"#/"+params.AscensorName+"0";else window.location.href="#"+params.AscensorName+NextWindows}});params.WindowsOn=NextWindows;if(params.CSSstyles==true){$("."+params.AscensorName+"NavigationButton").css("background","rgba(255,255,255,0.9)");$("."+params.AscensorName+"NavigationButton:eq("+params.WindowsOn+")").css("background","#ffa800")}return false});$(window).resize(function(){windowsHeight=$(window).height();windowsWidth=$(window).width();if(params.Direction=="x"&&params.ChocolateAscensor==false)$(node).children("div").each(function(index){var PageAscensor=
$(this).attr("id");var PageCoupe=PageAscensor.split(params.AscensorName);var PageFinal=parseInt(PageCoupe[1]);$(this).css("left",windowsWidth*PageFinal)});else if(params.Direction=="y"&&params.ChocolateAscensor==false)$(node).children("div").each(function(index){var PageAscensor=$(this).attr("id");var PageCoupe=PageAscensor.split(params.AscensorName);var PageFinal=parseInt(PageCoupe[1]);$(this).css("top",windowsHeight*PageFinal)});else if(params.Direction=="y"&&params.ChocolateAscensor==true||params.Direction==
"x"&&params.ChocolateAscensor==true)$(node).children("div").each(function(index){var CoordName=params.ContentCoord;var CoordCoupe=CoordName.split(" & ");var CoordoneUne=CoordCoupe[index];var Coord=CoordoneUne.split("|");var CoordX=parseInt(Coord[1])-1;var CoordY=parseInt(Coord[0])-1;$(this).css("margin-top",function(index){return CoordY*windowsHeight});$(this).css("margin-left",function(index){return CoordX*windowsWidth})});$(node).children("div").each(function(index){if($(this).children().height()>
windowsHeight)$(this).css({"overflow-y":"scroll"});else $(this).css({"overflow-y":"hidden"});if($(this).children().width()>windowsWidth)$(this).css({"overflow-x":"scroll"});else $(this).css({"overflow-x":"hidden"})});$("."+params.AscensorName).height(windowsHeight);$("."+params.AscensorName).width(windowsWidth);$.scrollTo($("#"+params.AscensorName+params.WindowsOn),0,{axis:params.NavigationDirection})});var temps=1E3;if(params.KeyArrow==false||params.keySwitch==false){function checkKey(e){switch(e.keyCode){case 40:return false;
case 38:return false;case 37:return false;case 39:return false}}if($.browser.mozilla)$(document).keypress(checkKey);else $(document).keydown(checkKey)}else if(params.KeyArrow==true&&params.keySwitch==true){function checkKey(e){switch(e.keyCode){case 40:ArrowFunction(1,-1);return false;break;case 38:ArrowFunction(1,+1);return false;break;case 37:ArrowFunction(1,+1);return false;break;case 39:ArrowFunction(1,-1);return false;break}}if($.browser.mozilla)$(document).keypress(checkKey);else $(document).keydown(checkKey)}function ArrowFunction(coordPart,
action){jQuery("html,body").queue([]).stop();temps-=50;var ThisContainer=params.WindowsOn;var PrevContainer=params.WindowsOn-1;var NextContainer=params.WindowsOn+1;if(PrevContainer<0)PrevContainer=PageNumber-1;if(NextContainer>PageNumber-1)NextContainer=0;var CoordName=params.ContentCoord;var CoordCoupe=CoordName.split(" & ");var CoordoneThis=CoordCoupe[ThisContainer];var CoordonePrev=CoordCoupe[PrevContainer];var CoordoneNext=CoordCoupe[NextContainer];var CoordThis=CoordoneThis.split("|");var CoordThisX=
parseInt(CoordThis[coordPart]);var CoordPrev=CoordonePrev.split("|");var CoordPrevX=parseInt(CoordPrev[coordPart]);var CoordNext=CoordoneNext.split("|");var CoordNextX=parseInt(CoordNext[coordPart]);if(CoordThisX==CoordNextX+action){params.WindowsOn=NextContainer;$.scrollTo($("#"+params.AscensorName+NextContainer),temps,{axis:params.NavigationDirection,onAfter:function(){temps=1E3;if(params.ReturnURL==true)if(trueURL==NextContainer)window.location.href="#/"+params.AscensorName+"0";else window.location.href=
"#/"+params.AscensorName+NextContainer}});if(params.CSSstyles==true){$("."+params.AscensorName+"NavigationButton").css("background","rgba(255,255,255,0.9)");$("."+params.AscensorName+"NavigationButton:eq("+params.WindowsOn+")").css("background","#ffa800")}}else if(CoordThisX==CoordPrevX+action){params.WindowsOn=PrevContainer;$.scrollTo($("#"+params.AscensorName+PrevContainer),1E3,{axis:params.NavigationDirection,onAfter:function(){if(params.ReturnURL==true)if(trueURL==NextContainer)window.location.href=
"#/"+params.AscensorName+"0";else window.location.href="#/"+params.AscensorName+PrevContainer}});if(params.CSSstyles==true){$("."+params.AscensorName+"NavigationButton").css("background","rgba(255,255,255,0.9)");$("."+params.AscensorName+"NavigationButton:eq("+params.WindowsOn+")").css("background","#ffa800")}}else $.scrollTo($("#"+params.AscensorName+params.WindowsOn),1E3,{axis:params.NavigationDirection})}if(params.ReturnCode==true){$("body").append('<div><div id="result"><h1>Code Page</h1><p id="pageCode">'+
resultatPage+'</p><br/><h1>Code Link</h1><p id="LinkCode">'+resultatLink+'</p></br><h1>Code Navigation</h1><p id="NavCode" ><p>'+resultatNav+'<p id="close">close this windows</p></div></div>');$("#result").css({"position":"fixed","top":"20%","left":"30%","background":"#fff","padding":"20px","font-size":"12px"});$("#close").css({"padding-left":"600px","color":"#f00","margin-top":"20px"});$("#result h1").css({"font-size":"18px"});$("#result p").css({"margin-left":"30px"});$("#close").click(function(){$("#result").hide()})}if(params.WindowsFocus==
true)$.scrollTo($("#"+params.AscensorName+params.WindowsOn),0,{axis:params.NavigationDirection})}})(jQuery);




/* =============================================================================
   SIMPLE MODAL FORM
   ========================================================================== */	

jQuery(function ($) {
	$('.smcf_link, .smcf-link').click(function (e) { // added .smcf_link for previous version
		e.preventDefault();
		// display the contact form
		$('#smcf-content').modal({
			closeHTML: "<a href='#' title='Close' class='modalCloseX simplemodal-close'>close</a>",
			position: ["15%",],
			overlayId: 'smcf-overlay',
			containerId: 'smcf-container',
			onOpen: contact.open,
			onShow: contact.show,
			onClose: contact.close,
			zIndex: 10000
		});
	});

	// preload images
	var img = ['loading.gif'];
	if ($('#smcf-content form').length > 0) {
		var url = $('#smcf-content form').attr('action').replace(/smcf_data\.php/, 'img/');
		$(img).each(function () {
			var i = new Image();
			i.src = url + this;
		});
	}

	var contact = {
		message: null,
		open: function (d) {
			// dynamically determine height
			var h = 500;
			if ($('#smcf-subject').length) {
				h += 26;
			}
			if ($('#smcf-cc').length) {
				h += 22;
			}

			// resize the textarea for safari
			if ($.browser.safari) {
				$('#smcf-container .smcf-input').css({
					'font-size': '.9em'
				});
			}

			var title = $('#smcf-container .smcf-title').html();
			$('#smcf-container .smcf-title').html(smcf_messages.loading);
			d.overlay.fadeIn(200, function () {
				d.container.fadeIn(200, function () {
					d.data.fadeIn(200, function () {
						$('#smcf-container .smcf-content').animate({
							height: h
						}, function () {
							$('#smcf-container .smcf-title').html(title);
							$('#smcf-container form').fadeIn(200, function () {
								$('#smcf-container #smcf-name').focus();

								$('#smcf-container .smcf-cc').click(function () {
									var cc = $('#smcf-container #smcf-cc');
									cc.is(':checked') ? cc.attr('checked', '') : cc.attr('checked', 'checked');
								});
							});
						});
					});
				});
			});
		},
		show: function (d) {
			$('#smcf-container .smcf-send').click(function (e) {
				e.preventDefault();
				// validate form
				if (contact.validate()) {
					$('#smcf-container .smcf-message').fadeOut(function () {
						$('#smcf-container .smcf-message').removeClass('smcf-error').empty();
					});
					$('#smcf-container .smcf-title').html(smcf_messages.sending);
					$('#smcf-container form').fadeOut(200);
					$('#smcf-container .smcf-content').animate({
						height: '90px'
					}, function () {
						$('#smcf-container .smcf-loading').fadeIn(200, function () {
							$.ajax({
								url: $('#smcf-content form').attr('action'),
								data: $('#smcf-container form').serialize() + '&action=send',
								type: 'post',
								cache: false,
								dataType: 'html',
								success: function (data) {
									$('#smcf-container .smcf-loading').fadeOut(200, function () {
										$('#smcf-container .smcf-title').html(smcf_messages.thankyou);
										$('#smcf-container .smcf-message').html(data).fadeIn(200);
									});
								},
								error: function (xhr) {
									$('#smcf-container .smcf-loading').fadeOut(200, function () {
										$('#smcf-container .smcf-title').html(smcf_messages.error);
										$('#smcf-container .smcf-message').html(xhr.status + ': ' + xhr.statusText).fadeIn(200);
									});
								}
							});
						});
					});
				}
				else {
					if ($('#smcf-container .smcf-message:visible').length > 0) {
					var msg = $('#smcf-container .smcf-message div');
						msg.fadeOut(200, function () {
							msg.empty();
							contact.showError();
							msg.fadeIn(200);
						});
					}
					else {
						$('#smcf-container .smcf-message').animate({
							height: '30px'
						}, contact.showError);
					}
				}
			});
		},
		close: function (d) {
			$('#smcf-container .smcf-message').fadeOut();
			$('#smcf-container .smcf-title').html(smcf_messages.goodbye);
			$('#smcf-container form').fadeOut(200);
			$('#smcf-container .smcf-content').animate({
				height: '40px'
			}, function () {
				d.data.fadeOut(200, function () {
					d.container.fadeOut(200, function () {
						d.overlay.fadeOut(200, function () {
							$.modal.close();
						});
					});
				});
			});
		},
		validate: function () {
			contact.message = '';
			var req = [],
				invalid = "";

			if (!$('#smcf-container #smcf-name').val()) {
				req.push(smcf_messages.name);
			}

			var email = $('#smcf-container #smcf-email').val();
			if (!email) {
				req.push(smcf_messages.email);
			}
			else {
				if (!contact.validateEmail(email)) {
					invalid = smcf_messages.emailinvalid;
				}
			}

			if (!$('#smcf-container #smcf-message').val()) {
				req.push(smcf_messages.message);
			}

			if (req.length > 0) {
				var fields = req.join(', ');
				contact.message += req.length > 1 ?
					fields.replace(/(.*),/,'$1 ' + smcf_messages.and) + ' ' + smcf_messages.are :
					fields + ' ' + smcf_messages.is;
				contact.message += ' ' + smcf_messages.required;
			}

			if (invalid.length > 0) {
				contact.message += (req.length > 0 ? ' ' : '') + smcf_messages.emailinvalid;
			}

			if (contact.message.length > 0) {
				return false;
			}
			else {
				return true;
			}
		},
		validateEmail: function (email) {
			var at = email.lastIndexOf("@");

			// Make sure the at (@) sybmol exists and  
			// it is not the first or last character
			if (at < 1 || (at + 1) === email.length)
				return false;

			// Make sure there aren't multiple periods together
			if (/(\.{2,})/.test(email))
				return false;

			// Break up the local and domain portions
			var local = email.substring(0, at);
			var domain = email.substring(at + 1);

			// Check lengths
			if (local.length < 1 || local.length > 64 || domain.length < 4 || domain.length > 255)
				return false;

			// Make sure local and domain don't start with or end with a period
			if (/(^\.|\.$)/.test(local) || /(^\.|\.$)/.test(domain))
				return false;

			// Check for quoted-string addresses
			// Since almost anything is allowed in a quoted-string address,
			// we're just going to let them go through
			if (!/^"(.+)"$/.test(local)) {
				// It's a dot-string address...check for valid characters
				if (!/^[-a-zA-Z0-9!#$%*\/?|^{}`~&'+=_\.]*$/.test(local))
					return false;
			}

			// Make sure domain contains only valid characters and at least one period
			if (!/^[-a-zA-Z0-9\.]*$/.test(domain) || domain.indexOf(".") === -1)
				return false;	

			return true;
		},
		showError: function () {
			$('#smcf-container .smcf-message')
				.html($('<div/>').addClass('smcf-error').append(contact.message))
				.fadeIn(200);
		}
	};
});


(function(b){"function"===typeof define&&define.amd?define(["jquery"],b):b(jQuery)})(function(b){var j=[],l=b(document),m=b.browser.msie&&6===parseInt(b.browser.version)&&"object"!==typeof window.XMLHttpRequest,o=b.browser.msie&&7===parseInt(b.browser.version),n=null,k=b(window),h=[];b.modal=function(a,d){return b.modal.impl.init(a,d)};b.modal.close=function(){b.modal.impl.close()};b.modal.focus=function(a){b.modal.impl.focus(a)};b.modal.setContainerDimensions=function(){b.modal.impl.setContainerDimensions()};
b.modal.setPosition=function(){b.modal.impl.setPosition()};b.modal.update=function(a,d){b.modal.impl.update(a,d)};b.fn.modal=function(a){return b.modal.impl.init(this,a)};b.modal.defaults={appendTo:"body",focus:!0,opacity:50,overlayId:"simplemodal-overlay",overlayCss:{},containerId:"simplemodal-container",containerCss:{},dataId:"simplemodal-data",dataCss:{},minHeight:null,minWidth:null,maxHeight:null,maxWidth:null,autoResize:!1,autoPosition:!0,zIndex:1E3,close:!0,closeHTML:'<a class="modalCloseImg" title="Close"></a>',
closeClass:"simplemodal-close",escClose:!0,overlayClose:!1,fixed:!0,position:null,persist:!1,modal:!0,onOpen:null,onShow:null,onClose:null};b.modal.impl={d:{},init:function(a,d){if(this.d.data)return!1;n=b.browser.msie&&!b.support.boxModel;this.o=b.extend({},b.modal.defaults,d);this.zIndex=this.o.zIndex;this.occb=!1;if("object"===typeof a){if(a=a instanceof b?a:b(a),this.d.placeholder=!1,0<a.parent().parent().size()&&(a.before(b("<span></span>").attr("id","simplemodal-placeholder").css({display:"none"})),
this.d.placeholder=!0,this.display=a.css("display"),!this.o.persist))this.d.orig=a.clone(!0)}else if("string"===typeof a||"number"===typeof a)a=b("<div></div>").html(a);else return alert("SimpleModal Error: Unsupported data type: "+typeof a),this;this.create(a);this.open();b.isFunction(this.o.onShow)&&this.o.onShow.apply(this,[this.d]);return this},create:function(a){this.getDimensions();if(this.o.modal&&m)this.d.iframe=b('<iframe src="javascript:false;"></iframe>').css(b.extend(this.o.iframeCss,
{display:"none",opacity:0,position:"fixed",height:h[0],width:h[1],zIndex:this.o.zIndex,top:0,left:0})).appendTo(this.o.appendTo);this.d.overlay=b("<div></div>").attr("id",this.o.overlayId).addClass("simplemodal-overlay").css(b.extend(this.o.overlayCss,{display:"none",opacity:this.o.opacity/100,height:this.o.modal?j[0]:0,width:this.o.modal?j[1]:0,position:"fixed",left:0,top:0,zIndex:this.o.zIndex+1})).appendTo(this.o.appendTo);this.d.container=b("<div></div>").attr("id",this.o.containerId).addClass("simplemodal-container").css(b.extend({position:this.o.fixed?
"fixed":"absolute"},this.o.containerCss,{display:"none",zIndex:this.o.zIndex+2})).append(this.o.close&&this.o.closeHTML?b(this.o.closeHTML).addClass(this.o.closeClass):"").appendTo(this.o.appendTo);this.d.wrap=b("<div></div>").attr("tabIndex",-1).addClass("simplemodal-wrap").css({height:"100%",outline:0,width:"100%"}).appendTo(this.d.container);this.d.data=a.attr("id",a.attr("id")||this.o.dataId).addClass("simplemodal-data").css(b.extend(this.o.dataCss,{display:"none"})).appendTo("body");this.setContainerDimensions();
this.d.data.appendTo(this.d.wrap);(m||n)&&this.fixIE()},bindEvents:function(){var a=this;b("."+a.o.closeClass).bind("click.simplemodal",function(b){b.preventDefault();a.close()});a.o.modal&&a.o.close&&a.o.overlayClose&&a.d.overlay.bind("click.simplemodal",function(b){b.preventDefault();a.close()});l.bind("keydown.simplemodal",function(b){a.o.modal&&9===b.keyCode?a.watchTab(b):a.o.close&&a.o.escClose&&27===b.keyCode&&(b.preventDefault(),a.close())});k.bind("resize.simplemodal orientationchange.simplemodal",
function(){a.getDimensions();a.o.autoResize?a.setContainerDimensions():a.o.autoPosition&&a.setPosition();m||n?a.fixIE():a.o.modal&&(a.d.iframe&&a.d.iframe.css({height:h[0],width:h[1]}),a.d.overlay.css({height:j[0],width:j[1]}))})},unbindEvents:function(){b("."+this.o.closeClass).unbind("click.simplemodal");l.unbind("keydown.simplemodal");k.unbind(".simplemodal");this.d.overlay.unbind("click.simplemodal")},fixIE:function(){var a=this.o.position;b.each([this.d.iframe||null,!this.o.modal?null:this.d.overlay,
"fixed"===this.d.container.css("position")?this.d.container:null],function(b,f){if(f){var g=f[0].style;g.position="absolute";if(2>b)g.removeExpression("height"),g.removeExpression("width"),g.setExpression("height",'document.body.scrollHeight > document.body.clientHeight ? document.body.scrollHeight : document.body.clientHeight + "px"'),g.setExpression("width",'document.body.scrollWidth > document.body.clientWidth ? document.body.scrollWidth : document.body.clientWidth + "px"');else{var c,e;a&&a.constructor===
Array?(c=a[0]?"number"===typeof a[0]?a[0].toString():a[0].replace(/px/,""):f.css("top").replace(/px/,""),c=-1===c.indexOf("%")?c+' + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"':parseInt(c.replace(/%/,""))+' * ((document.documentElement.clientHeight || document.body.clientHeight) / 100) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',a[1]&&(e="number"===typeof a[1]?
a[1].toString():a[1].replace(/px/,""),e=-1===e.indexOf("%")?e+' + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"':parseInt(e.replace(/%/,""))+' * ((document.documentElement.clientWidth || document.body.clientWidth) / 100) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"')):(c='(document.documentElement.clientHeight || document.body.clientHeight) / 2 - (this.offsetHeight / 2) + (t = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop) + "px"',
e='(document.documentElement.clientWidth || document.body.clientWidth) / 2 - (this.offsetWidth / 2) + (t = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft) + "px"');g.removeExpression("top");g.removeExpression("left");g.setExpression("top",c);g.setExpression("left",e)}}})},focus:function(a){var d=this,a=a&&-1!==b.inArray(a,["first","last"])?a:"first",f=b(":input:enabled:visible:"+a,d.d.wrap);setTimeout(function(){0<f.length?f.focus():d.d.wrap.focus()},
10)},getDimensions:function(){var a="undefined"===typeof window.innerHeight?k.height():window.innerHeight;j=[l.height(),l.width()];h=[a,k.width()]},getVal:function(a,b){return a?"number"===typeof a?a:"auto"===a?0:0<a.indexOf("%")?parseInt(a.replace(/%/,""))/100*("h"===b?h[0]:h[1]):parseInt(a.replace(/px/,"")):null},update:function(a,b){if(!this.d.data)return!1;this.d.origHeight=this.getVal(a,"h");this.d.origWidth=this.getVal(b,"w");this.d.data.hide();a&&this.d.container.css("height",a);b&&this.d.container.css("width",
b);this.setContainerDimensions();this.d.data.show();this.o.focus&&this.focus();this.unbindEvents();this.bindEvents()},setContainerDimensions:function(){var a=m||o,d=this.d.origHeight?this.d.origHeight:b.browser.opera?this.d.container.height():this.getVal(a?this.d.container[0].currentStyle.height:this.d.container.css("height"),"h"),a=this.d.origWidth?this.d.origWidth:b.browser.opera?this.d.container.width():this.getVal(a?this.d.container[0].currentStyle.width:this.d.container.css("width"),"w"),f=this.d.data.outerHeight(!0),
g=this.d.data.outerWidth(!0);this.d.origHeight=this.d.origHeight||d;this.d.origWidth=this.d.origWidth||a;var c=this.o.maxHeight?this.getVal(this.o.maxHeight,"h"):null,e=this.o.maxWidth?this.getVal(this.o.maxWidth,"w"):null,c=c&&c<h[0]?c:h[0],e=e&&e<h[1]?e:h[1],i=this.o.minHeight?this.getVal(this.o.minHeight,"h"):"auto",d=d?this.o.autoResize&&d>c?c:d<i?i:d:f?f>c?c:this.o.minHeight&&"auto"!==i&&f<i?i:f:i,c=this.o.minWidth?this.getVal(this.o.minWidth,"w"):"auto",a=a?this.o.autoResize&&a>e?e:a<c?c:a:
g?g>e?e:this.o.minWidth&&"auto"!==c&&g<c?c:g:c;this.d.container.css({height:d,width:a});this.d.wrap.css({overflow:f>d||g>a?"auto":"visible"});this.o.autoPosition&&this.setPosition()},setPosition:function(){var a,b;a=h[0]/2-this.d.container.outerHeight(!0)/2;b=h[1]/2-this.d.container.outerWidth(!0)/2;var f="fixed"!==this.d.container.css("position")?k.scrollTop():0;this.o.position&&"[object Array]"===Object.prototype.toString.call(this.o.position)?(a=f+(this.o.position[0]||a),b=this.o.position[1]||
b):a=f+a;this.d.container.css({left:b,top:a})},watchTab:function(a){if(0<b(a.target).parents(".simplemodal-container").length){if(this.inputs=b(":input:enabled:visible:first, :input:enabled:visible:last",this.d.data[0]),!a.shiftKey&&a.target===this.inputs[this.inputs.length-1]||a.shiftKey&&a.target===this.inputs[0]||0===this.inputs.length)a.preventDefault(),this.focus(a.shiftKey?"last":"first")}else a.preventDefault(),this.focus()},open:function(){this.d.iframe&&this.d.iframe.show();b.isFunction(this.o.onOpen)?
this.o.onOpen.apply(this,[this.d]):(this.d.overlay.show(),this.d.container.show(),this.d.data.show());this.o.focus&&this.focus();this.bindEvents()},close:function(){if(!this.d.data)return!1;this.unbindEvents();if(b.isFunction(this.o.onClose)&&!this.occb)this.occb=!0,this.o.onClose.apply(this,[this.d]);else{if(this.d.placeholder){var a=b("#simplemodal-placeholder");this.o.persist?a.replaceWith(this.d.data.removeClass("simplemodal-data").css("display",this.display)):(this.d.data.hide().remove(),a.replaceWith(this.d.orig))}else this.d.data.hide().remove();
this.d.container.hide().remove();this.d.overlay.hide();this.d.iframe&&this.d.iframe.hide().remove();this.d.overlay.remove();this.d={}}}}});



/* =============================================================================
   EASING
   ========================================================================== */	
/*jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/ */
jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def: 'easeOutQuad',swing: function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d);},easeInQuad: function(x,t,b,c,d){return c*(t/=d)*t+b;},easeOutQuad: function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b;},easeInOutQuad: function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;},easeInCubic: function(x,t,b,c,d){return c*(t/=d)*t*t+b;},easeOutCubic: function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b;},easeInOutCubic: function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b;},easeInQuart: function(x,t,b,c,d){return c*(t/=d)*t*t*t+b;},easeOutQuart: function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b;},easeInOutQuart: function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b;},easeInQuint: function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b;},easeOutQuint: function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;},easeInOutQuint: function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;},easeInSine: function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b;},easeOutSine: function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b;},easeInOutSine: function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b;},easeInExpo: function(x,t,b,c,d){return(t==0)?b : c*Math.pow(2,10*(t/d-1))+b;},easeOutExpo: function(x,t,b,c,d){return(t==d)?b+c : c*(-Math.pow(2,-10*t/d)+1)+b;},easeInOutExpo: function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b;},easeInCirc: function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b;},easeOutCirc: function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b;},easeInOutCirc: function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b;},easeInElastic: function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;},easeOutElastic: function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b;},easeInOutElastic: function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4;}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;},easeInBack: function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;},easeOutBack: function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;},easeInOutBack: function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;},easeInBounce: function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b;},easeOutBounce: function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}},easeInOutBounce: function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b;}});jQuery.easing['jswing']=jQuery.easing['swing'];jQuery.extend(jQuery.easing,{def:'easeOutQuad',swing:function(x,t,b,c,d){return jQuery.easing[jQuery.easing.def](x,t,b,c,d)},easeInQuad:function(x,t,b,c,d){return c*(t/=d)*t+b},easeOutQuad:function(x,t,b,c,d){return-c*(t/=d)*(t-2)+b},easeInOutQuad:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b},easeInCubic:function(x,t,b,c,d){return c*(t/=d)*t*t+b},easeOutCubic:function(x,t,b,c,d){return c*((t=t/d-1)*t*t+1)+b},easeInOutCubic:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t+b;return c/2*((t-=2)*t*t+2)+b},easeInQuart:function(x,t,b,c,d){return c*(t/=d)*t*t*t+b},easeOutQuart:function(x,t,b,c,d){return-c*((t=t/d-1)*t*t*t-1)+b},easeInOutQuart:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t+b;return-c/2*((t-=2)*t*t*t-2)+b},easeInQuint:function(x,t,b,c,d){return c*(t/=d)*t*t*t*t+b},easeOutQuint:function(x,t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b},easeInOutQuint:function(x,t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b},easeInSine:function(x,t,b,c,d){return-c*Math.cos(t/d*(Math.PI/2))+c+b},easeOutSine:function(x,t,b,c,d){return c*Math.sin(t/d*(Math.PI/2))+b},easeInOutSine:function(x,t,b,c,d){return-c/2*(Math.cos(Math.PI*t/d)-1)+b},easeInExpo:function(x,t,b,c,d){return(t==0)?b:c*Math.pow(2,10*(t/d-1))+b},easeOutExpo:function(x,t,b,c,d){return(t==d)?b+c:c*(-Math.pow(2,-10*t/d)+1)+b},easeInOutExpo:function(x,t,b,c,d){if(t==0)return b;if(t==d)return b+c;if((t/=d/2)<1)return c/2*Math.pow(2,10*(t-1))+b;return c/2*(-Math.pow(2,-10*--t)+2)+b},easeInCirc:function(x,t,b,c,d){return-c*(Math.sqrt(1-(t/=d)*t)-1)+b},easeOutCirc:function(x,t,b,c,d){return c*Math.sqrt(1-(t=t/d-1)*t)+b},easeInOutCirc:function(x,t,b,c,d){if((t/=d/2)<1)return-c/2*(Math.sqrt(1-t*t)-1)+b;return c/2*(Math.sqrt(1-(t-=2)*t)+1)+b},easeInElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b},easeOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);return a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b},easeInOutElastic:function(x,t,b,c,d){var s=1.70158;var p=0;var a=c;if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)p=d*(.3*1.5);if(a<Math.abs(c)){a=c;var s=p/4}else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b},easeInBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b},easeOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b},easeInOutBack:function(x,t,b,c,d,s){if(s==undefined)s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b},easeInBounce:function(x,t,b,c,d){return c-jQuery.easing.easeOutBounce(x,d-t,0,c,d)+b},easeOutBounce:function(x,t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b}},easeInOutBounce:function(x,t,b,c,d){if(t<d/2)return jQuery.easing.easeInBounce(x,t*2,0,c,d)*.5+b;return jQuery.easing.easeOutBounce(x,t*2-d,0,c,d)*.5+c*.5+b}});


/* =============================================================================
   MOUSEWHEEL
   ========================================================================== */	


(function(d){function g(a){var b=a||window.event,i=[].slice.call(arguments,1),c=0,h=0,e=0;a=d.event.fix(b);a.type="mousewheel";if(a.wheelDelta)c=a.wheelDelta/120;if(a.detail)c=-a.detail/3;e=c;if(b.axis!==undefined&&b.axis===b.HORIZONTAL_AXIS){e=0;h=-1*c}if(b.wheelDeltaY!==undefined)e=b.wheelDeltaY/120;if(b.wheelDeltaX!==undefined)h=-1*b.wheelDeltaX/120;i.unshift(a,c,h,e);return d.event.handle.apply(this,i)}var f=["DOMMouseScroll","mousewheel"];d.event.special.mousewheel={setup:function(){if(this.addEventListener)for(var a=
f.length;a;)this.addEventListener(f[--a],g,false);else this.onmousewheel=g},teardown:function(){if(this.removeEventListener)for(var a=f.length;a;)this.removeEventListener(f[--a],g,false);else this.onmousewheel=null}};d.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})})(jQuery);

/* =============================================================================
   PRETTIFY
   ========================================================================== */	



window.PR_SHOULD_USE_CONTINUATION=true;window.PR_TAB_WIDTH=8;window.PR_normalizedHtml=window.PR=window.prettyPrintOne=window.prettyPrint=void 0;window._pr_isIE6=function(){var y=navigator&&navigator.userAgent&&navigator.userAgent.match(/\bMSIE ([678])\./);y=y?+y[1]:false;window._pr_isIE6=function(){return y};return y};
(function(){function y(b){return b.replace(L,"&amp;").replace(M,"&lt;").replace(N,"&gt;")}function H(b,f,i){switch(b.nodeType){case 1:var o=b.tagName.toLowerCase();f.push("<",o);var l=b.attributes,n=l.length;if(n){if(i){for(var r=[],j=n;--j>=0;)r[j]=l[j];r.sort(function(q,m){return q.name<m.name?-1:q.name===m.name?0:1});l=r}for(j=0;j<n;++j){r=l[j];r.specified&&f.push(" ",r.name.toLowerCase(),'="',r.value.replace(L,"&amp;").replace(M,"&lt;").replace(N,"&gt;").replace(X,"&quot;"),'"')}}f.push(">");
for(l=b.firstChild;l;l=l.nextSibling)H(l,f,i);if(b.firstChild||!/^(?:br|link|img)$/.test(o))f.push("</",o,">");break;case 3:case 4:f.push(y(b.nodeValue));break}}function O(b){function f(c){if(c.charAt(0)!=="\\")return c.charCodeAt(0);switch(c.charAt(1)){case "b":return 8;case "t":return 9;case "n":return 10;case "v":return 11;case "f":return 12;case "r":return 13;case "u":case "x":return parseInt(c.substring(2),16)||c.charCodeAt(1);case "0":case "1":case "2":case "3":case "4":case "5":case "6":case "7":return parseInt(c.substring(1),
8);default:return c.charCodeAt(1)}}function i(c){if(c<32)return(c<16?"\\x0":"\\x")+c.toString(16);c=String.fromCharCode(c);if(c==="\\"||c==="-"||c==="["||c==="]")c="\\"+c;return c}function o(c){var d=c.substring(1,c.length-1).match(RegExp("\\\\u[0-9A-Fa-f]{4}|\\\\x[0-9A-Fa-f]{2}|\\\\[0-3][0-7]{0,2}|\\\\[0-7]{1,2}|\\\\[\\s\\S]|-|[^-\\\\]","g"));c=[];for(var a=[],k=d[0]==="^",e=k?1:0,h=d.length;e<h;++e){var g=d[e];switch(g){case "\\B":case "\\b":case "\\D":case "\\d":case "\\S":case "\\s":case "\\W":case "\\w":c.push(g);
continue}g=f(g);var s;if(e+2<h&&"-"===d[e+1]){s=f(d[e+2]);e+=2}else s=g;a.push([g,s]);if(!(s<65||g>122)){s<65||g>90||a.push([Math.max(65,g)|32,Math.min(s,90)|32]);s<97||g>122||a.push([Math.max(97,g)&-33,Math.min(s,122)&-33])}}a.sort(function(v,w){return v[0]-w[0]||w[1]-v[1]});d=[];g=[NaN,NaN];for(e=0;e<a.length;++e){h=a[e];if(h[0]<=g[1]+1)g[1]=Math.max(g[1],h[1]);else d.push(g=h)}a=["["];k&&a.push("^");a.push.apply(a,c);for(e=0;e<d.length;++e){h=d[e];a.push(i(h[0]));if(h[1]>h[0]){h[1]+1>h[0]&&a.push("-");
a.push(i(h[1]))}}a.push("]");return a.join("")}function l(c){for(var d=c.source.match(RegExp("(?:\\[(?:[^\\x5C\\x5D]|\\\\[\\s\\S])*\\]|\\\\u[A-Fa-f0-9]{4}|\\\\x[A-Fa-f0-9]{2}|\\\\[0-9]+|\\\\[^ux0-9]|\\(\\?[:!=]|[\\(\\)\\^]|[^\\x5B\\x5C\\(\\)\\^]+)","g")),a=d.length,k=[],e=0,h=0;e<a;++e){var g=d[e];if(g==="(")++h;else if("\\"===g.charAt(0))if((g=+g.substring(1))&&g<=h)k[g]=-1}for(e=1;e<k.length;++e)if(-1===k[e])k[e]=++n;for(h=e=0;e<a;++e){g=d[e];if(g==="("){++h;if(k[h]===undefined)d[e]="(?:"}else if("\\"===
g.charAt(0))if((g=+g.substring(1))&&g<=h)d[e]="\\"+k[h]}for(h=e=0;e<a;++e)if("^"===d[e]&&"^"!==d[e+1])d[e]="";if(c.ignoreCase&&r)for(e=0;e<a;++e){g=d[e];c=g.charAt(0);if(g.length>=2&&c==="[")d[e]=o(g);else if(c!=="\\")d[e]=g.replace(/[a-zA-Z]/g,function(s){s=s.charCodeAt(0);return"["+String.fromCharCode(s&-33,s|32)+"]"})}return d.join("")}for(var n=0,r=false,j=false,q=0,m=b.length;q<m;++q){var t=b[q];if(t.ignoreCase)j=true;else if(/[a-z]/i.test(t.source.replace(/\\u[0-9a-f]{4}|\\x[0-9a-f]{2}|\\[^ux]/gi,
""))){r=true;j=false;break}}var p=[];q=0;for(m=b.length;q<m;++q){t=b[q];if(t.global||t.multiline)throw Error(""+t);p.push("(?:"+l(t)+")")}return RegExp(p.join("|"),j?"gi":"g")}function Y(b){var f=0;return function(i){for(var o=null,l=0,n=0,r=i.length;n<r;++n)switch(i.charAt(n)){case "\t":o||(o=[]);o.push(i.substring(l,n));l=b-f%b;for(f+=l;l>=0;l-=16)o.push("                ".substring(0,l));l=n+1;break;case "\n":f=0;break;default:++f}if(!o)return i;o.push(i.substring(l));return o.join("")}}function I(b,
f,i,o){if(f){b={source:f,c:b};i(b);o.push.apply(o,b.d)}}function B(b,f){var i={},o;(function(){for(var r=b.concat(f),j=[],q={},m=0,t=r.length;m<t;++m){var p=r[m],c=p[3];if(c)for(var d=c.length;--d>=0;)i[c.charAt(d)]=p;p=p[1];c=""+p;if(!q.hasOwnProperty(c)){j.push(p);q[c]=null}}j.push(/[\0-\uffff]/);o=O(j)})();var l=f.length;function n(r){for(var j=r.c,q=[j,z],m=0,t=r.source.match(o)||[],p={},c=0,d=t.length;c<d;++c){var a=t[c],k=p[a],e=void 0,h;if(typeof k==="string")h=false;else{var g=i[a.charAt(0)];
if(g){e=a.match(g[1]);k=g[0]}else{for(h=0;h<l;++h){g=f[h];if(e=a.match(g[1])){k=g[0];break}}e||(k=z)}if((h=k.length>=5&&"lang-"===k.substring(0,5))&&!(e&&typeof e[1]==="string")){h=false;k=P}h||(p[a]=k)}g=m;m+=a.length;if(h){h=e[1];var s=a.indexOf(h),v=s+h.length;if(e[2]){v=a.length-e[2].length;s=v-h.length}k=k.substring(5);I(j+g,a.substring(0,s),n,q);I(j+g+s,h,Q(k,h),q);I(j+g+v,a.substring(v),n,q)}else q.push(j+g,k)}r.d=q}return n}function x(b){var f=[],i=[];if(b.tripleQuotedStrings)f.push([A,/^(?:\'\'\'(?:[^\'\\]|\\[\s\S]|\'{1,2}(?=[^\']))*(?:\'\'\'|$)|\"\"\"(?:[^\"\\]|\\[\s\S]|\"{1,2}(?=[^\"]))*(?:\"\"\"|$)|\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$))/,
null,"'\""]);else b.multiLineStrings?f.push([A,/^(?:\'(?:[^\\\']|\\[\s\S])*(?:\'|$)|\"(?:[^\\\"]|\\[\s\S])*(?:\"|$)|\`(?:[^\\\`]|\\[\s\S])*(?:\`|$))/,null,"'\"`"]):f.push([A,/^(?:\'(?:[^\\\'\r\n]|\\.)*(?:\'|$)|\"(?:[^\\\"\r\n]|\\.)*(?:\"|$))/,null,"\"'"]);b.verbatimStrings&&i.push([A,/^@\"(?:[^\"]|\"\")*(?:\"|$)/,null]);if(b.hashComments)if(b.cStyleComments){f.push([C,/^#(?:(?:define|elif|else|endif|error|ifdef|include|ifndef|line|pragma|undef|warning)\b|[^\r\n]*)/,null,"#"]);i.push([A,/^<(?:(?:(?:\.\.\/)*|\/?)(?:[\w-]+(?:\/[\w-]+)+)?[\w-]+\.h|[a-z]\w*)>/,
null])}else f.push([C,/^#[^\r\n]*/,null,"#"]);if(b.cStyleComments){i.push([C,/^\/\/[^\r\n]*/,null]);i.push([C,/^\/\*[\s\S]*?(?:\*\/|$)/,null])}b.regexLiterals&&i.push(["lang-regex",RegExp("^"+Z+"(/(?=[^/*])(?:[^/\\x5B\\x5C]|\\x5C[\\s\\S]|\\x5B(?:[^\\x5C\\x5D]|\\x5C[\\s\\S])*(?:\\x5D|$))+/)")]);b=b.keywords.replace(/^\s+|\s+$/g,"");b.length&&i.push([R,RegExp("^(?:"+b.replace(/\s+/g,"|")+")\\b"),null]);f.push([z,/^\s+/,null," \r\n\t\u00a0"]);i.push([J,/^@[a-z_$][a-z_$@0-9]*/i,null],[S,/^@?[A-Z]+[a-z][A-Za-z_$@0-9]*/,
null],[z,/^[a-z_$][a-z_$@0-9]*/i,null],[J,/^(?:0x[a-f0-9]+|(?:\d(?:_\d+)*\d*(?:\.\d*)?|\.\d\+)(?:e[+\-]?\d+)?)[a-z]*/i,null,"0123456789"],[E,/^.[^\s\w\.$@\'\"\`\/\#]*/,null]);return B(f,i)}function $(b){function f(D){if(D>r){if(j&&j!==q){n.push("</span>");j=null}if(!j&&q){j=q;n.push('<span class="',j,'">')}var T=y(p(i.substring(r,D))).replace(e?d:c,"$1&#160;");e=k.test(T);n.push(T.replace(a,s));r=D}}var i=b.source,o=b.g,l=b.d,n=[],r=0,j=null,q=null,m=0,t=0,p=Y(window.PR_TAB_WIDTH),c=/([\r\n ]) /g,
d=/(^| ) /gm,a=/\r\n?|\n/g,k=/[ \r\n]$/,e=true,h=window._pr_isIE6();h=h?b.b.tagName==="PRE"?h===6?"&#160;\r\n":h===7?"&#160;<br>\r":"&#160;\r":"&#160;<br />":"<br />";var g=b.b.className.match(/\blinenums\b(?::(\d+))?/),s;if(g){for(var v=[],w=0;w<10;++w)v[w]=h+'</li><li class="L'+w+'">';var F=g[1]&&g[1].length?g[1]-1:0;n.push('<ol class="linenums"><li class="L',F%10,'"');F&&n.push(' value="',F+1,'"');n.push(">");s=function(){var D=v[++F%10];return j?"</span>"+D+'<span class="'+j+'">':D}}else s=h;
for(;;)if(m<o.length?t<l.length?o[m]<=l[t]:true:false){f(o[m]);if(j){n.push("</span>");j=null}n.push(o[m+1]);m+=2}else if(t<l.length){f(l[t]);q=l[t+1];t+=2}else break;f(i.length);j&&n.push("</span>");g&&n.push("</li></ol>");b.a=n.join("")}function u(b,f){for(var i=f.length;--i>=0;){var o=f[i];if(G.hasOwnProperty(o))"console"in window&&console.warn("cannot override language handler %s",o);else G[o]=b}}function Q(b,f){b&&G.hasOwnProperty(b)||(b=/^\s*</.test(f)?"default-markup":"default-code");return G[b]}
function U(b){var f=b.f,i=b.e;b.a=f;try{var o,l=f.match(aa);f=[];var n=0,r=[];if(l)for(var j=0,q=l.length;j<q;++j){var m=l[j];if(m.length>1&&m.charAt(0)==="<"){if(!ba.test(m))if(ca.test(m)){f.push(m.substring(9,m.length-3));n+=m.length-12}else if(da.test(m)){f.push("\n");++n}else if(m.indexOf(V)>=0&&m.replace(/\s(\w+)\s*=\s*(?:\"([^\"]*)\"|'([^\']*)'|(\S+))/g,' $1="$2$3$4"').match(/[cC][lL][aA][sS][sS]=\"[^\"]*\bnocode\b/)){var t=m.match(W)[2],p=1,c;c=j+1;a:for(;c<q;++c){var d=l[c].match(W);if(d&&
d[2]===t)if(d[1]==="/"){if(--p===0)break a}else++p}if(c<q){r.push(n,l.slice(j,c+1).join(""));j=c}else r.push(n,m)}else r.push(n,m)}else{var a;p=m;var k=p.indexOf("&");if(k<0)a=p;else{for(--k;(k=p.indexOf("&#",k+1))>=0;){var e=p.indexOf(";",k);if(e>=0){var h=p.substring(k+3,e),g=10;if(h&&h.charAt(0)==="x"){h=h.substring(1);g=16}var s=parseInt(h,g);isNaN(s)||(p=p.substring(0,k)+String.fromCharCode(s)+p.substring(e+1))}}a=p.replace(ea,"<").replace(fa,">").replace(ga,"'").replace(ha,'"').replace(ia," ").replace(ja,
"&")}f.push(a);n+=a.length}}o={source:f.join(""),h:r};var v=o.source;b.source=v;b.c=0;b.g=o.h;Q(i,v)(b);$(b)}catch(w){if("console"in window)console.log(w&&w.stack?w.stack:w)}}var A="str",R="kwd",C="com",S="typ",J="lit",E="pun",z="pln",P="src",V="nocode",Z=function(){for(var b=["!","!=","!==","#","%","%=","&","&&","&&=","&=","(","*","*=","+=",",","-=","->","/","/=",":","::",";","<","<<","<<=","<=","=","==","===",">",">=",">>",">>=",">>>",">>>=","?","@","[","^","^=","^^","^^=","{","|","|=","||","||=",
"~","break","case","continue","delete","do","else","finally","instanceof","return","throw","try","typeof"],f="(?:^^|[+-]",i=0;i<b.length;++i)f+="|"+b[i].replace(/([^=<>:&a-z])/g,"\\$1");f+=")\\s*";return f}(),L=/&/g,M=/</g,N=/>/g,X=/\"/g,ea=/&lt;/g,fa=/&gt;/g,ga=/&apos;/g,ha=/&quot;/g,ja=/&amp;/g,ia=/&nbsp;/g,ka=/[\r\n]/g,K=null,aa=RegExp("[^<]+|<!--[\\s\\S]*?--\>|<!\\[CDATA\\[[\\s\\S]*?\\]\\]>|</?[a-zA-Z](?:[^>\"']|'[^']*'|\"[^\"]*\")*>|<","g"),ba=/^<\!--/,ca=/^<!\[CDATA\[/,da=/^<br\b/i,W=/^<(\/?)([a-zA-Z][a-zA-Z0-9]*)/,
la=x({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename using virtual wchar_t where break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof debugger eval export function get null set undefined var with Infinity NaN caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END break continue do else for if return while case done elif esac eval fi function in local set then until ",
hashComments:true,cStyleComments:true,multiLineStrings:true,regexLiterals:true}),G={};u(la,["default-code"]);u(B([],[[z,/^[^<?]+/],["dec",/^<!\w[^>]*(?:>|$)/],[C,/^<\!--[\s\S]*?(?:-\->|$)/],["lang-",/^<\?([\s\S]+?)(?:\?>|$)/],["lang-",/^<%([\s\S]+?)(?:%>|$)/],[E,/^(?:<[%?]|[%?]>)/],["lang-",/^<xmp\b[^>]*>([\s\S]+?)<\/xmp\b[^>]*>/i],["lang-js",/^<script\b[^>]*>([\s\S]*?)(<\/script\b[^>]*>)/i],["lang-css",/^<style\b[^>]*>([\s\S]*?)(<\/style\b[^>]*>)/i],["lang-in.tag",/^(<\/?[a-z][^<>]*>)/i]]),["default-markup",
"htm","html","mxml","xhtml","xml","xsl"]);u(B([[z,/^[\s]+/,null," \t\r\n"],["atv",/^(?:\"[^\"]*\"?|\'[^\']*\'?)/,null,"\"'"]],[["tag",/^^<\/?[a-z](?:[\w.:-]*\w)?|\/?>$/i],["atn",/^(?!style[\s=]|on)[a-z](?:[\w:-]*\w)?/i],["lang-uq.val",/^=\s*([^>\'\"\s]*(?:[^>\'\"\s\/]|\/(?=\s)))/],[E,/^[=<>\/]+/],["lang-js",/^on\w+\s*=\s*\"([^\"]+)\"/i],["lang-js",/^on\w+\s*=\s*\'([^\']+)\'/i],["lang-js",/^on\w+\s*=\s*([^\"\'>\s]+)/i],["lang-css",/^style\s*=\s*\"([^\"]+)\"/i],["lang-css",/^style\s*=\s*\'([^\']+)\'/i],
["lang-css",/^style\s*=\s*([^\"\'>\s]+)/i]]),["in.tag"]);u(B([],[["atv",/^[\s\S]+/]]),["uq.val"]);u(x({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof alignof align_union asm axiom bool concept concept_map const_cast constexpr decltype dynamic_cast explicit export friend inline late_check mutable namespace nullptr reinterpret_cast static_assert static_cast template typeid typename using virtual wchar_t where ",
hashComments:true,cStyleComments:true}),["c","cc","cpp","cxx","cyc","m"]);u(x({keywords:"null true false"}),["json"]);u(x({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient as base by checked decimal delegate descending event fixed foreach from group implicit in interface internal into is lock object out override orderby params partial readonly ref sbyte sealed stackalloc string select uint ulong unchecked unsafe ushort var ",
hashComments:true,cStyleComments:true,verbatimStrings:true}),["cs"]);u(x({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof abstract boolean byte extends final finally implements import instanceof null native package strictfp super synchronized throws transient ",
cStyleComments:true}),["java"]);u(x({keywords:"break continue do else for if return while case done elif esac eval fi function in local set then until ",hashComments:true,multiLineStrings:true}),["bsh","csh","sh"]);u(x({keywords:"break continue do else for if return while and as assert class def del elif except exec finally from global import in is lambda nonlocal not or pass print raise try with yield False True None ",hashComments:true,multiLineStrings:true,tripleQuotedStrings:true}),["cv","py"]);
u(x({keywords:"caller delete die do dump elsif eval exit foreach for goto if import last local my next no our print package redo require sub undef unless until use wantarray while BEGIN END ",hashComments:true,multiLineStrings:true,regexLiterals:true}),["perl","pl","pm"]);u(x({keywords:"break continue do else for if return while alias and begin case class def defined elsif end ensure false in module next nil not or redo rescue retry self super then true undef unless until when yield BEGIN END ",hashComments:true,
multiLineStrings:true,regexLiterals:true}),["rb"]);u(x({keywords:"break continue do else for if return while auto case char const default double enum extern float goto int long register short signed sizeof static struct switch typedef union unsigned void volatile catch class delete false import new operator private protected public this throw true try typeof debugger eval export function get null set undefined var with Infinity NaN ",cStyleComments:true,regexLiterals:true}),["js"]);u(B([],[[A,/^[\s\S]+/]]),
["regex"]);window.PR_normalizedHtml=H;window.prettyPrintOne=function(b,f){var i={f:b,e:f};U(i);return i.a};window.prettyPrint=function(b){function f(){for(var t=window.PR_SHOULD_USE_CONTINUATION?j.now()+250:Infinity;q<o.length&&j.now()<t;q++){var p=o[q];if(p.className&&p.className.indexOf("prettyprint")>=0){var c=p.className.match(/\blang-(\w+)\b/);if(c)c=c[1];for(var d=false,a=p.parentNode;a;a=a.parentNode)if((a.tagName==="pre"||a.tagName==="code"||a.tagName==="xmp")&&a.className&&a.className.indexOf("prettyprint")>=
0){d=true;break}if(!d){a=p;if(null===K){d=document.createElement("PRE");d.appendChild(document.createTextNode('<!DOCTYPE foo PUBLIC "foo bar">\n<foo />'));K=!/</.test(d.innerHTML)}if(K){d=a.innerHTML;if("XMP"===a.tagName)d=y(d);else{a=a;if("PRE"===a.tagName)a=true;else if(ka.test(d)){var k="";if(a.currentStyle)k=a.currentStyle.whiteSpace;else if(window.getComputedStyle)k=window.getComputedStyle(a,null).whiteSpace;a=!k||k==="pre"}else a=true;a||(d=d.replace(/(<br\s*\/?>)[\r\n]+/g,"$1").replace(/(?:[\r\n]+[ \t]*)+/g,
" "))}d=d}else{d=[];for(a=a.firstChild;a;a=a.nextSibling)H(a,d);d=d.join("")}d=d.replace(/(?:\r\n?|\n)$/,"");m={f:d,e:c,b:p};U(m);if(p=m.a){c=m.b;if("XMP"===c.tagName){d=document.createElement("PRE");for(a=0;a<c.attributes.length;++a){k=c.attributes[a];if(k.specified)if(k.name.toLowerCase()==="class")d.className=k.value;else d.setAttribute(k.name,k.value)}d.innerHTML=p;c.parentNode.replaceChild(d,c)}else c.innerHTML=p}}}}if(q<o.length)setTimeout(f,250);else b&&b()}for(var i=[document.getElementsByTagName("pre"),
document.getElementsByTagName("code"),document.getElementsByTagName("xmp")],o=[],l=0;l<i.length;++l)for(var n=0,r=i[l].length;n<r;++n)o.push(i[l][n]);i=null;var j=Date;j.now||(j={now:function(){return(new Date).getTime()}});var q=0,m;f()};window.PR={combinePrefixPatterns:O,createSimpleLexer:B,registerLangHandler:u,sourceDecorator:x,PR_ATTRIB_NAME:"atn",PR_ATTRIB_VALUE:"atv",PR_COMMENT:C,PR_DECLARATION:"dec",PR_KEYWORD:R,PR_LITERAL:J,PR_NOCODE:V,PR_PLAIN:z,PR_PUNCTUATION:E,PR_SOURCE:P,PR_STRING:A,
PR_TAG:"tag",PR_TYPE:S}})()





