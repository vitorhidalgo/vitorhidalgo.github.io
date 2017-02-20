
var portfolio = portfolio || {};
portfolio.Tcontact = function($, objname, options)
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
		self.inputMask();
		self.processValidationForms();
	};

	this.processTriggers = function()
	{

	};

	this.onElementsEvents = function()
	{

	};

	this.inputMask = function()
	{
		$('#iptPhone').simpleMask({ 'mask' : '(##)#####-####', 'nextInput' : true });
	};

	this.processValidationForms = function()
	{
		$("#formContact").validate
		(
			{
				debug          : true,
				errorElement   : 'span',
				errorPlacement : $.noop,
				highlight: function( element, errorClass, validClass )
				{
					self.trigger('field-invalid', element.form.id + '-' + element.id );
					$(element).addClass(errorClass).removeClass(validClass);
					$(element.form).find("label[for=" + element.id + "]").addClass(errorClass);
				},
				unhighlight: function( element, errorClass, validClass )
				{
					self.trigger('field-valid', element.form.id + '-' + element.id );
					$(element).removeClass(errorClass).addClass(validClass);
					$(element.form).find("label[for=" + element.id + "]").removeClass(errorClass);
				},
				submitHandler: function( p_form )
				{
					self.showLoading();
					var form = $(p_form).serialize();
					self.sendFormSubmit( form );
				}
			}
		);
	};

	this.sendFormSubmit = function( p_form )
	{
		$.ajax
		(
			{
				url      : 'https://portfolio-vitorhidalgo.herokuapp.com/contact/',
				type     : 'POST',
				dataType : 'json',
				data     : p_form
			}
		)
		.done
		(
			function( data ) 
			{
				self.resetForm();
				self.hideLoading();
				console.log("success");
			}
		)
		.fail
		(
			function( data ) 
			{
				console.log("error");
				self.hideLoading();
			}
		);
		
		self.log.info(p_form);
	};

	this.resetForm = function()
	{
		$('#forContact')[0].reset();
	};

	this.showLoading = function()
	{
		$('.loading').fadeIn();
	};

	this.hideLoading = function()
	{
		setTimeout
		(
			function() 
			{
				$('.loading').fadeOut();
			}, 
			1000
		);
	};

	CjsBaseClass.call(this, $, objname, options);

	this.init();
};

portfolio.contact = new portfolio.Tcontact
(
	window.cjsbaseclass_jquery,
	'contact',
	{
		'debug'         : CJS_DEBUG_MODE_1,
		'highlighted'   : 'auto'
	}
);