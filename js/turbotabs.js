/** 
  * TurboTabs jQuery Plugin
  * Author: Aleksej Vukomanovic
  * Website: http://themeflection.com
  * Version: 1.1
  * Version from: 25.03.2015
  * Licence: MIT 
  */
;(function ( $ ) {
    $.fn.turbotabs = function(options){
        // setting the defaults
        var settings = $.extend({
            textColor: '#fff',
            backgroundColor: 'rgba(6,13,19,0.7)',
            navBackground: '#929292',
            hoverColor: '#fff',
            hoverBackground: 'rgba(6,13,19,0.84)',
            activeBackground: 'rgba(6,13,19,0.7)',
            mode: 'horizontal',
            width: '60%',
            padding: '20%',
            animation: 'Scale',
            headingTextColor : '#fff',
            navTextShadow : 'on',
            navTextShadowColor : 'dark',
            navAlign : 'left'
        },options);
        if( settings.deinitialize === 'true' ){
            return
        }
        var tabs = this.find('.tt_tabs');
        var container = this.find('.tt_container');
        var tab = this.find('.tt_container .tt_tab');
        var sel = this;
        var random =  'tab-' + Math.floor( Math.random() * 100 ); // for assigning random class (tobe used for hover effect)
        var animation = settings.animation;
        var animationIn = '';
        var animationOut = '';
        var once = 0;
        var primWidth = []; // create an array that will store the primary widths, before resizing (used in responsive function)
        var tabsResponsive = false;
        var timer = 340;
        var tabHeights = '';
        var maxHeight = '';

        setTimeout(function(){ // delay setting the heigh for small interval, giving it a time to collect right value
        calcHeight();
        },150);

        if( settings.mode == 'vertical' ){ // check if mode is set to vertical
            sel.addClass('vertical');
        }
        // applying the color, background and other options to the actual tab
        this.css({width: settings.width, padding: '20px ' + settings.padding});
        container.css({color: settings.textColor, background: settings.backgroundColor});
        this.addClass(random).closest('html').find('head').append('<style data-style="turbotab" type="text/css">.' + random + ' .tt_tabs li{background: ' + settings.navBackground + ' ; color: ' + settings.textColor + '} .' + random + ' .tt_tabs li:hover, .' + random + ' .tt_tabs h3:hover{background: ' + settings.hoverBackground + '; color: ' + settings.hoverColor +'} .' + random + ' .tt_tabs li.active, .' + random + ' .tt_tabs li.active h3{background:'+ settings.activeBackground +'; color: '+ settings.hoverColor +'} .' + random + ' .tt_tabs .tt_tab{color: '+ settings.textColor +'} .' + random + ' .tt_tabs h3{color: '+ settings.headingTextColor +'} .' + random + ' .tt_tabs:not(.responsive), .' + random + ' .tt_tabs:not(.vertical){text-align: '+ settings.navAlign +'}</style>');
        if( settings.navTextShadow === 'on' ) {  // if text shadow enabled
            if( settings.navTextShadowColor === 'dark' ){
                sel.closest('html').find('head style[data-style="turbotab"]').append(' .' + random + ':not(.responsive) .tt_tabs li, .' + random + ' .tt_tabs h3{text-shadow: 1px 0 2px #333;}');
            } else {
                sel.closest('html').find('head style[data-style="turbotab"]').append(' .' + random + ':not(.responsive) .tt_tabs li, .' + random + ' .tt_tabs h3{text-shadow: 1px 0 2px #fefefe;}');
            }
        }

         /*==============================================
                            ANIMATIONS
        ================================================*/
        if( 'Scale' === animation ){
            animationIn = 'zoomIn';
            animationOut = 'zoomOut';
        }
        else if( 'FadeUp' === animation ){
            animationIn = 'fadeInUp';
            animationOut = 'fadeOutDown';
        }
        else if( 'FadeDown' === animation ){
            animationIn = 'fadeInDown';
            animationOut = 'fadeOutUp';
        }
        else if( 'FadeLeft' === animation ){
            animationIn = 'fadeInLeft';
            animationOut = 'fadeOutLeft';
        }
        else if( 'FadeRight' === animation ){
            animationIn = 'fadeInRight';
            animationOut = 'fadeOutRight';
        }
         else if( 'SlideUp' === animation ){
            animationIn = 'SlideInUp';
            animationOut = 'SlideOutUp';
            timer = 80;
        }
        else if( 'SlideDown' === animation ){
            animationIn = 'SlideInDown';
            animationOut = 'SlideOutDown';
            timer = 80;
        }
        else if( 'SlideLeft' === animation ){
            animationIn = 'SlideInLeft';
            animationOut = 'SlideOutLeft';
            timer = 80;
        }
        else if( 'SlideRight' === animation ){
            animationIn = 'SlideInRight';
            animationOut = 'SlideOutRight';
            timer = 80;
        }
        else if( 'ScrollDown' === animation ){
            animationIn = 'fadeInUp';
            animationOut = 'fadeOutUp';
        }
        else if( 'ScrollUp' === animation ){
            animationIn = 'fadeInDown';
            animationOut = 'fadeOutDown';
        }
        else if( 'ScrollRight' === animation ){
            animationIn = 'fadeInLeft';
            animationOut = 'fadeOutRight';
        }
        else if( 'ScrollLeft' === animation ){
            animationIn = 'fadeInRight';
            animationOut = 'fadeOutLeft';
        }
        else if( 'Bounce' === animation ){
            animationIn = 'bounceIn';
            animationOut = 'bounceOut';
        }
        else if( 'BounceLeft' === animation ){
            animationIn = 'bounceInLeft';
            animationOut = 'bounceOutLeft';
        }
        else if( 'BounceRight' === animation ){
            animationIn = 'bounceInRight';
            animationOut = 'bounceOutRight';
        }
        else if( 'BounceDown' === animation ){
            animationIn = 'bounceInDown';
            animationOut = 'bounceOutDown';
        }
        else if( 'BounceUp' === animation ){
            animationIn = 'bounceInUp';
            animationOut = 'bounceOutUp';
        } 
         else if( 'HorizontalFlip' === animation ){
            animationIn = 'flipInX';
            animationOut = 'flipOutX';
        }
        else if( 'VerticalFlip' === animation ){
            animationIn = 'flipInY';
            animationOut = 'flipOutY';
        }
         else if( 'RotateDownLeft' === animation ){
            animationIn = 'rotateInDownLeft';
            animationOut = 'rotateOutDownLeft';
        }
        else if( 'RotateDownRight' === animation ){
            animationIn = 'rotateInDownRight';
            animationOut = 'rotateOutDownRight';
        } 
        else if( 'RotateUpLeft' === animation ){
            animationIn = 'rotateInUpLeft';
            animationOut = 'rotateOutUpLeft';
        }
        else if( 'RotateUpRight' === animation ){
            animationIn = 'rotateInUpRight';
            animationOut = 'rotateOutUpRight';
        } 
        else if( 'TopZoom' === animation ){
            animationIn = 'zoomInUp';
            animationOut = 'zoomOutUp';
        }
        else if( 'BottomZoom' === animation ){
            animationIn = 'zoomInDown';
            animationOut = 'zoomOutDown';
        }
        else if( 'LeftZoom' === animation ){
            animationIn = 'zoomInLeft';
            animationOut = 'zoomOutLeft';
        }
        else if( 'RightZoom' === animation ){
            animationIn = 'zoomInRight';
            animationOut = 'zoomOutRight';
        }

        /*==============================================
                       Initialize Tabs
        ===============================================*/
        tabs.find('li').on('click', function(){
            if( true === tabsResponsive ){
                 if( !$(this).hasClass("active") ) {
                    $(this).addClass('active').find('.tt_tab').slideDown().parent().siblings().removeClass('active').find('.tt_tab').slideUp();
                 } else{
                     $(this).removeClass('active').find('.tt_tab').slideUp();
                 }// else
            } else {
                if( !$(this).hasClass("active") ) {
                    var index = $(this).index();
                    var current = $(this);
                    $(this).parent().find("li.active").removeClass("active");
                    $(this).addClass("active");
                    $(this).closest(sel).find("div.tt_tab.active").attr('class', 'tt_tab animated ' + animationOut); 
                     setTimeout(function(){
                        current.closest(sel).find("div.tt_tab").eq(index).attr('class', 'tt_tab active animated '+ animationIn);; 
                    },timer);
                }// if
            }// else
        });
        /*==============================================
                        RESPONSIVENESS
        ===============================================*/
        // create variables that will store values that will be added later
            var tabsWidth = 0;
            var currWidth = 0;
            var conWidth = 0;
            var mobile = false;
            var tabW = 0;
            var called = 0;
            var resized = 0;
            primWidth['resized'] = 0;

           
            calcWidth();
           
        if( settings.mode != 'accordion' ) {   

            if( settings.mode != 'vertical' ) {

                if( tabW < tabsWidth + 20 ){ // if starting from small screen transform it to accordion now
                       reset(); 
                       mobile = true;
                }
                
                $(window).resize(function(){
                    var windowWidth = parseInt( $(window).outerWidth() ); // check for device width;
                    calcWidth(); //callback

                    if( !mobile ) { // if viewed on larger screen and then resized to smaller one 
                        
                        if( true === tabsResponsive && currWidth > primWidth['container'] ||  tabs.width() > primWidth['container'] ){
                           resize(); 
                        } else if( false === tabsResponsive && tabW < ( tabsWidth + 10 ) ){
                           reset(); 
                        } else if( primWidth['resized'] != 0 ){
                            if( currWidth > primWidth['resized'] + 40 ) {
                                resize(); 
                            }
                        }
                    } else { 
                       // if starting from small screen
                       if( windowWidth < 480 ) {
                           if(  true === tabsResponsive && currWidth > primWidth['container']  * 1.5 ) { 
                                resize(); 
                                setTimeout(function(){
                                calcHeight();    
                                if( 1 === once ){
                                    primWidth['disposal'] = tabW + 130;
                                } //if
                                },120);
                                
                            } //if 
                            if( false === tabsResponsive && primWidth['disposal'] > currWidth ){ 
                                reset(); 
                            }//if
                        } else if( windowWidth > 480  ){
                            var zbr = tabs.find('li').length * 170; // calculate approximate width for each tab nav
                            if( currWidth > zbr ) {
                                resize();
                            } else {
                                reset();
                            }
                        }    
                    }//else
                }); //window.resize()
            } else { // if vertical mode 
                var windowWidth = parseInt( $(window).outerWidth() );
                
                 if( windowWidth < 760 ){ // if starting from small screen transform it to accordion now
                       reset();
                       mobile = true;
                }

                $(window).resize(function(){
                    windowWidth = parseInt( $(window).outerWidth() ); //  updatedevice width;
                    calcWidth(); 
                    if( !mobile ) { // if viewed on larger screen and then resized to smaller one
                        if( windowWidth < 720 ){
                            reset(); 
                        } else {
                            resize(); 
                        }  
                    } else {
                        if( windowWidth > 720 ){
                            resize();
                            setTimeout(function(){
                                calcHeight();    
                            },120);
                        } else {
                            reset();
                        }//else

                    }//else
                });//window.resize()
            } // else (is vertical)
        } else {
            reset();
        }//else( is accordion)
        
        /*==============================================
                        HELPER FUNCTIONS
        ===============================================*/
        function calcWidth(){
             // reset variables before adding new values
             tabsWidth = 0;
             currWidth = 0;
             conWidth = 0;
             // get the widths of both navigations and container
             currWidth = parseInt( tabs.find('li').first().outerWidth(true) ); // get current width of resized tab li
             conWidth = parseInt( container.outerWidth(true) );
             if( tabsResponsive === false ){
                 tabs.find('li').each(function(){ // loop through navs and add width to variable
                    tabsWidth += parseInt( $(this).outerWidth(true) );
                 }); //if
            } else {
                tabsWidth = primWidth['tabs'];
            }//else
            // use the array created in the beginning to store primary widths
            //make sure that this process is done only once (preventing the new values to override the old ones)
            if( 0 === once ) {
                once++ ;
                primWidth['tabs'] = tabsWidth + 10;
                primWidth['container'] = conWidth;
            } else if ( 0 === once && mobile ){
                primWidth['container'] = sel.find('.tt_tabs li.active .tt_tab').width();
            }
            tabW = parseInt( $('.tt_tab').width() );
        }// calcWidth()

        function calcHeight(){
            //seting the the tab content height to the tallest tab content
            // src = http://stackoverflow.com/questions/6781031/use-jquery-css-to-find-the-tallest-of-all-elements
            // Get an array of all element heights
            tabHeights = tab.map(function() {
            return $(this).outerHeight(true);
            }).get();
            // Math.max takes a variable number of arguments
            // `apply` is equivalent to passing each height as an argument
            maxHeight = Math.max.apply(null, tabHeights);
            container.css('height', maxHeight);
        }// calcHeight()

        function reset(){ // transform tab to accordion if number of nav tabs exceeds container width
            tabsResponsive = true;
            if( called === 0 ){
                primWidth['resized'] = parseInt( container.width() );
                called++;
            }
            sel.addClass('responsive');
            if( tabs.find('li').first().find('h3').length != 1 ){
                tabs.find('li').wrapInner('<h3></h3>');
            }
            var index = -1;
            var zbir = tab.length;
            for( var i = 0; i < zbir; i++ ){
                (tab.eq(i)).appendTo(tabs.find('li').eq(i));
            }
            if( resized === 0 ){
                sel.closest('html').find('head style[data-style="turbotab"]').append(' .'+random+' .tt_tabs h3{background: ' + settings.navBackground + ';} .'+ random +'.responsive .tt_tabs li, .'+ random +'.responsive .tt_tabs li.active, .'+ random +'.responsive .tt_tabs li:hover{background: '+ settings.backgroundColor +';}');
                resized++;
            }
            sel.find('.tt_tabs .tt_tab').not('.active').slideUp();
        }// reset

        function resize(){ // reset accordion to tab again
            if( !mobile && settings.mode != 'vertical' ){
                tabsWidth = 0;
                currWidth = 0;
                conWidth = 0;
             }
            var activeIndex = tabs.find('li.active').index();
            sel.removeClass('responsive');  
            tabsResponsive = false;
            tabs.find('li').each(function(){
                var h3 = $(this).find('h3');
                var value = h3.html();
                $(this).find('.tt_tab').appendTo(container);
                $(this).html(value).find(h3).remove();
                tab.css('display', 'block');
            });
            tabs.find('li').eq(activeIndex).addClass('active').siblings().removeClass('active');
            container.find('.tt_tab').eq(activeIndex).addClass('active').siblings().removeClass('active');
            if( mobile ){
                tabW = 0;
                tabs.find('li').each(function(){ // loop through navs and add width to variable
                    tabW += parseInt( $(this).outerWidth(true) ); 
                });    
                conWidth = parseInt( container.outerWidth(true) );
            }   
        }// resize
       
        return this;

    }; // TurboTabs

}( jQuery ));