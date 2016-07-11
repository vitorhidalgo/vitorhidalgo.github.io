var portfolio = portfolio || {};
portfolio.TMain = function($, objname, options)
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

	};

	CjsBaseClass.call(this, $, objname, options);

	this.init();
};

portfolio.Main = new portfolio.TMain
(
	window.cjsbaseclass_jquery,
	'Main',
	{
		'debug': 1,
		'highlighted': 'red'
	}
);