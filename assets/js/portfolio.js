
var portfolio = portfolio || {};
portfolio.Tportfolio = function($, objname, options)
{
	'use strict';
	var self = this;

	this.init = function()
	{
		self.initVars();
		self.processTriggers();
		self.onElementsEvents();
	};

	this.initVars = function()
	{

	};

	this.onReady = function()
	{
		// CODE ON APLICATION IS READY
		self.start();
	};

	this.start = function()
	{
		// CODE ON APLICATION IS STARTED
		self.triggerStarted();
	};

	this.processTriggers = function()
	{

	};

	this.onElementsEvents = function()
	{
		self.eventOpenModal();
		self.eventCloseModal();
	};

	this.eventOpenModal = function()
	{
		$(document).on
		(
			'click', 
			'#portfolio .item a', 
			function(e)
			{
				e.preventDefault();
				self.openModal();
			}
		);
	};

	this.openModal = function()
	{
		$('.modal-portfolio').addClass('open');
		$('body').addClass('no-scroll');
	};

	this.eventCloseModal = function()
	{
		$(document).on
		(
			'click', 
			'.modal-portfolio a.btn-close', 
			function(e)
			{
				e.preventDefault();
				self.closeModal();
			}
		);
	};

	this.closeModal = function()
	{
		$('.modal-portfolio').addClass('close');
		$('body').removeClass('no-scroll');
		setTimeout
		(
			function() 
			{
				$('.modal-portfolio').removeClass('open close');
			}, 
			2300
		);
	};

	CjsBaseClass.call(this, $, objname, options);

	this.init();
};

portfolio.portfolio = new portfolio.Tportfolio
(
	window.cjsbaseclass_jquery,
	'portfolio',
	{
		'debug': 1,
		'highlighted': false
	}
);