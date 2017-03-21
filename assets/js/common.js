var common = (function(){
	'use strict';
	var _json = "assets/json/projects.json";
	return {
		init: function(){
			common.parallax();
			common.fixedMenu();
			common.chart();
			common.anchorNavigation();
			common.loadAllProjects();
			common.inputActive();
			common.validateForm();
		},
		parallax: function(){
			$('.bgParallax').each(function(){
				var $obj = $(this);
				$(window).scroll(function(){
					var yPos = -($(window).scrollTop() / $obj.data('speed'));
					var bgpos = '50% ' + yPos + 'px';
					$obj.css('background-position', bgpos);
				});
			});
		},
		fixedMenu: function(){
			var nav = $('section.navigation');
			var article = $('section#about article');
			$(window).scroll(function(){
				if($(this).scrollTop() > 753){
					nav.addClass('f-nav');
					article.css({'padding-top':'160px'});
				}else{
					nav.removeClass('f-nav');
					article.css({'padding-top':'80px'});
				}
			});
		},
		chart: function(){
			$(".dial").knob({
				min : 0,
				max : 100,
				readOnly : true,
				width : 196,
				height : 200,
				thickness: 0.18,
				fgColor: '#14b9d6',
				linecap : 'round',
				displayInput : false,
				bgColor: '#333f4c',
				draw : function(){
				}
			});
		},
		portfolio: function(){
			$('#portfolio ul li .job').hover(function(){
				$(this).children('.more').stop().animate({
					'height': '302px'
				}, 300);
			}, function(){
				$(this).children('.more').stop().animate({
					'height': '0px'
				}, 300);
			});
			$('#portfolio ul li a').click(function(e){
				common.selectProject($(this).data('project'));
				e.preventDefault();
			});
		},
		anchorNavigation : function(){
			$('section.navigation a:not(.socialMedia)').click(function(e){
				e.preventDefault();
				if(this.hash === '#about')
					$('html, body').scrollTo(0, $(this.hash).offset().top);
				else
					$('html, body').scrollTo(0, ($(this.hash).offset().top - 80));
			});
			var aChildren = $('section.navigation li:not(.lnkPerfil)').children();
			var aArray = [];
			for(var i=0; i < aChildren.length; i++){
				var aChild = aChildren[i];
				var aHref = $(aChild).attr('href');
				aArray.push(aHref);
			}

			$(window).scroll(function(){
				var windowPos = $(window).scrollTop();
				var windowHeight = $(window).height();
				var docHeight = $(document).height();

				for (var i = 0; i < aArray.length; i++){
					var theId = aArray[i];
					var divPos = $(theId).offset().top - 82;
					var divHeight = $(theId).height();
					if(windowPos >= divPos && windowPos < (divPos + divHeight)){
						$('a[href="' + theId + '"]').addClass('active');
					}else{
						$('a[href="' + theId + '"]').removeClass('active');
					}
				}

				if(windowPos + windowHeight == docHeight){
					$('.active').removeClass('active');
					$('section.navigation li').not('.lnkPerfil').last().children('a').addClass('active');
				}
			});
		},
		loadAllProjects : function(){
			var strHtml = "";
			$.getJSON(_json, function(data){
				$.each(data, function(index, value){
					strHtml += '<li>';
					strHtml += '<div class="job">';
					strHtml += '<div class="more">';
					strHtml += '<a href="#details" data-project="' + value.id + '">Veja Mais Detalhes <br><span class="sprite">&nbsp;</span></a>';
					strHtml += '</div>';
					strHtml += '<img src="' + value.thumb1 + '" height="300" width="300" alt="">';
					strHtml += '</div>';
					strHtml += '<div class="clear"></div>';
					strHtml += '<h5>' + value.nameProject + '</h5>';
					strHtml += '<h6>' + value.nameCustomer + '</h6>';
					strHtml += '</li>';
				});
				$('#portfolio ul').html(strHtml);
				common.portfolio();
			});
		},
		selectProject : function(project){
			$('#portfolio ul li a').fancybox({
				'padding' : 10,
				'margin' : 0,
				'minWidth' : 930,
				'minHeight' : 485,
				'mouseWhell' : false,
				'wrapCSS' : 'fancybox-wrapper',
				'scrolling' : "no",
				'closeBtn' : false,
				beforeLoad : function(){
					common.loadProject(project);
				}
			});
		},
		loadProject : function(project){
			var strHtml = "";
			$.getJSON(_json, function(data){
				$.each(data, function(index, value){
					if (value.id === project){
						if(value.urlProject !== ""){
							$('.details .image').html('<a href="' + value.urlProject + '" target="_blank"><img src="' + value.thumb2 + '" alt=""></a>');
						}else{
							$('.details .image').html('<img src="' + value.thumb2 + '" alt="">');
						}
						$('.details aside h4').text(value.nameCustomer);
						$('.details aside h5').text(value.nameProject);
						$('.details aside p:eq(0)').text(value.description);
						$.each(value.languages, function(i, v){
							var count = value.languages.length;
							if (i === count - 1){
								strHtml += v + ".";
							}else{
								strHtml += v + ", ";
							}
						});
						$('.details aside p:eq(1)').text(strHtml);
						strHtml = "";
						$.each(value.plataforms, function(i, v){
							if(v === "desktop"){
								strHtml += '<span class="sprite device desktop"></span>';
							}else if(v === "tablet"){
								strHtml += '<span class="sprite device tablet"></span>';
							}else if(v === "mobile"){
								strHtml += '<span class="sprite device mobile"></span>';
							}
						});
						$('.details aside').append(strHtml);
					}
				});
			});
		},
		validateForm : function(){
			$('button').click(function(e){
				var valid = true;
				$('.error').removeClass('error');
				if(common.isNotEmpty($('#iptName'))){
					console.log('nome vazio');
					$('#iptName').parents('label').addClass('error');
					valid = false;
				}
				if(common.isNotEmpty($('#iptEmail'))){
					console.log('email vazio');
					$('#iptEmail').parents('label').addClass('error');
					valid = false;
				}else{
					if(!common.isEmailValid($('#iptEmail'))){
						$('#iptEmail').parents('label').addClass('error');
						console.log('email inválido');
						valid = false;
					}
				}
				if(common.isNotEmpty($('#iptPhone'))){
					$('#iptPhone').parents('label').addClass('error');
					console.log('telefone vazio');
					valid = false;
				}
				if(common.isNotEmpty($('#txtMessage'))){
					$('#txtMessage').addClass('error');
					console.log('telefone vazio');
					valid = false;
				}
				if(valid){
					alert('enviado');
				}
				e.preventDefault();
			});
		},
		isNotEmpty : function(obj){
			var iptValue = $.trim(obj.val());
			if(iptValue === "" || iptValue === "0,00" || iptValue === "__/__/____" || iptValue === "(__)_________"){
				return true;
			}
			return false;
		},
		isEmailValid : function(obj){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			var iptValue = $.trim(obj.val());
			return re.test(iptValue);
		},
		inputActive : function(){
			$('section#contact input').focus(function(e){
				$(this).parents('label').addClass('active');
			});
			$('section#contact input').focusout(function(e){
				$(this).parents('label').removeClass('active');
			});
			$('section#contact textarea').focus(function(){
				$(this).addClass('active');
			});
			$('section#contact textarea').focusout(function(){
				$(this).removeClass('active');
			});
		}
	};

})();

$(document).ready(common.init);
