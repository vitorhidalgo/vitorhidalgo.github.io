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

		self.doc  = document.documentElement;
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
		self.breakPoints();
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
				
			}
		);

		$(document).on
		(
			'click',
			'.menu a[href^="#"]',
			function(e)
			{
				var href = $(this).attr( 'href' );
				e.preventDefault();
				
				$( 'nav.menu a.open' ).removeClass( 'open' );
				$( 'nav.menu .cont-menu' ).removeClass( 'open' );

				$.scrollify.move( href );
			}
		);
	};

	this.breakPoints = function()
	{
		$('#page').umsBreakPoints
		(
			{
				'syncWidthMediaQuery' : true,
				'widths'              : [768],
				'onBreakPoint'        : function(p_eventdata)
				{
					if(p_eventdata.curWidth <= 768)
					{
						this.element.toggleClass('device-desktop device-mobile');
						self.destroyScroll();
					}
					else
					{
						self.applyScroll();
					}
				}
			}
		);
	};

	this.destroyScroll = function()
	{
		$.scrollify.destroy();
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
		$.scrollify
		(
			{
				section : ".panel",
				scrollbars: true,
				sectionName : "section-name",
				interstitialSection : 'footer',
				before : function(index, sections)
				{
					$('.menu li.active').removeClass('active');
					$('.menu li:eq(' + ( index - 1 ) + ')').addClass('active');
				}
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