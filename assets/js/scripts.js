var portfolio = portfolio || {};
portfolio.TMain = function($, objname, options)
{
	'use strict';
	var self = this;

	this.init = function()
	{
		self.processTriggers();
		self.onElementsEvents();
	};

	this.initVars = function()
	{
		self.menu = {
			container : $('nav.menu'),
			position  : $('nav.menu').offset().top
		};

		self.doc = document.documentElement;
	};

	this.onReady = function()
	{
		// CODE ON APLICATION IS READY
		self.start();
		self.initVars();
	};

	this.start = function()
	{
		// CODE ON APLICATION IS STARTED
		self.triggerStarted();
		self.applyScroll();
		self.placeholder();
		self.events();
	};

	this.processTriggers = function()
	{

	};

	this.events = function()
	{
		window.addEventListener
		(
			'scroll', 
			function()
			{
				// self.fixedMenu();
			}
		);

		window.addEventListener
		(
			'resize', 
			function()
			{
				self.menu.position = self.menu.container.offset().top;
			}
		);

		$(document).on
		(
			'click',
			'.menu a[href^="#"]',
			function(e)
			{
				var href=$(this).attr('href'), target=$(href).parents('.mCustomScrollbar');
				if( target.length )
				{
					e.preventDefault();
					
					$('nav.menu a.open').removeClass('open');
					$('nav.menu .cont-menu').removeClass('open');

					target.mCustomScrollbar( 'scrollTo', href );
				}
			}
		);

		$('.menu a[href*="#"]').mPageScroll2id({
			clickEvents    : true,
			highlightClass : 'active'
		});
	};

	this.onElementsEvents = function()
	{
		self.openMenuMobile();
	};

	this.placeholder = function()
	{
		$('input, textarea').placeholder();
	};

	this.fixedMenu = function( p_position )
	{
		self.position = (window.pageYOffset);
		if(self.position >= self.menu.position)
		{
			self.menu.container.addClass('fixed');
		}
		else
		{
			self.menu.container.removeClass('fixed');
		}
	};

	this.openMenuMobile = function()
	{
		$('nav.menu a.icon-menu').on
		(
			'click', 
			function(e)
			{
				e.preventDefault();
				if( $(this).hasClass('open') )
				{
					$(this).removeClass('open');
					$('nav.menu .cont-menu').removeClass('open');
				}
				else
				{
					$(this).addClass('open');
					$('nav.menu .cont-menu').addClass('open');
				}
			}
		);
	};

	this.applyScroll = function()
	{
		$('body').mCustomScrollbar
		(
			{
				'theme'             : 'vho',
				'scrollbarPosition' : 'outside',
				'scrollEasing'      : 'easeInOut',
				'autoHideScrollbar' : true,
				'callbacks'         : {
					whileScrolling : function()
					{
						self.fixedMenu( this.mcs.draggerTop );
					}
				}
			}
		);

		$("a[href*='#']").mPageScroll2id
		(
			{
				'appendHash' : true
			}
		);
	};

	CjsBaseClass.call(this, $, objname, options);

	this.init();
};

portfolio.Main = new portfolio.TMain
(
	window.cjsbaseclass_jquery,
	'Main',
	{
		'debug'       : 1,
		'highlighted' : 'auto'
	}
);