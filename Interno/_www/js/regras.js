/**
 * @package     Cattive.Site
 * @subpackage  Templates.cattive
 *
 * @copyright   Copyright (C) 2015, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */

/* global  $, Pace, SelectFx, FForm, classie, DialogFx */


//Plugin Click Toggle
/*
 * jQuery Function Toggle Pluing
 * Copyright 2011, Felix Kling
 * Dual licensed under the MIT or GPL Version 2 licenses.
 */
;(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}) (function($) {
    $.fn.funcToggle = function(type, data) {
        var dname = "jqp_eventtoggle_" + type + (new Date()).getTime(),            
            funcs = Array.prototype.slice.call(arguments, 2),
            numFuncs = funcs.length,
            empty = function() {},
            false_handler = function() {return false;};

        if(typeof type === "object") {
            for( var key in type) {
                $.fn.funcToggle.apply(this, [key].concat(type[key]));
            }
            return this;
        }
        if($.isFunction(data) || data === false) {
            funcs = [data].concat(funcs);
            numFuncs += 1;
            data = undefined;
        }
        
        funcs = $.map(funcs, function(func) {
            if(func === false) {
                return false_handler;
            }
            if(!$.isFunction(func)) {
                return empty;
            }
            return func;
        });

        this.data(dname, 0);
        this.bind(type, data, function(event) {
            var data = $(this).data(),
                index = data[dname];
            funcs[index].call(this, event);
            data[dname] = (index + 1) % numFuncs;
        });
        return this;
    };
});



$(function () {
    
	//Smooth Scroll
	$('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') 
        || location.hostname == this.hostname) {

        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
           if (target.length) {
             $('html,body').animate({
                 scrollTop: target.offset().top
            }, 1000);
            return false;
        }
      }
    });
    
	//Abrir e fechar o menu
	$('.menu-top').funcToggle('click', function() {
	   $('.megamenu').fadeIn(200);
		}, function() {
		   $('.megamenu').fadeOut(200);
	});

	//Fechar o menu no mouseOver
	$('.megamenu').mouseleave(function() {
	  $(this).fadeOut(200);
	});

});

(function() {
				// initialize all
				
				[].slice.call( document.querySelectorAll( '.si-icons-default > .si-icon' ) ).forEach( function( el ) {
					var svgicon = new svgIcon( el, svgIconConfig );
				} );

				
				new svgIcon( document.querySelector( '.si-icons-easing .si-icon-hamburger' ), svgIconConfig, { easing : mina.backin } );
})();


