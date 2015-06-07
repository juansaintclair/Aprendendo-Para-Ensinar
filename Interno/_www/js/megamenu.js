/// <reference path="../../typings/jquery/jquery.d.ts"/>

var config = {
	objConstante: '.constante',
	_ultimaLargura: 0
};

$(function () {
	$('.pai')
		.mouseenter(function () {
		config._ultimaLargura = 0;

		ocultaFilhos();
		exibeHierarquia($(this));

		if ($('.filho:visible').length > 0) {
			config._ultimaLargura += $('.patriarca').width();
		}

		validaFixo();
	});

	parentesco.getNaoPais().mouseleave(function () {
		var tios = parentesco.getTios(this);

		tios.forEach(function (tio) {
			parentesco.getFilhos(tio)
				.hide()
				.parents('.top')
				.css({
				marginLeft: ''
			});
		});
	});

	$('.menu').mouseleave(ocultaFilhos);
});

function validaFixo() {
	var larguraVisivel = 0;

	$('.top').filter(function () { return $(this).width() > 20; }).each(function (i, e) {
		larguraVisivel += $(e).width();
	});

	if (larguraVisivel > 210) {
		$('.fixo').hide();
	} else {
		$('.fixo').show().css({
			marginLeft: config._ultimaLargura + 10
		});
	}
}

function ocultaFilhos() {
	$('.filho').hide().parents('.top').css('margin-left', '');
	$('.fixo').hide().css({ marginLeft: '220px' });
}

function exibeHierarquia($item) {
	var largura = $item.width() + 10;
	var pai = $item.data('pai');

	if ($item.hasClass('filho')) {
		largura += exibeHierarquia($('[data-nome="' + pai + '"]'));
	}

	var top = $('.filho[data-pai="' + $item.data('nome') + '"]');

	top
		.show()
		.parents('.top')
		.css({
		marginLeft: largura
	});

	if (config._ultimaLargura < largura)
		config._ultimaLargura = largura;

	return largura;
}

var parentesco = {
	getFilhos: function (nomePai) {
		return $('[data-pai="' + nomePai + '"]');
	},
	getPai: function (nomeFilho) {
		var nomePai = $('[data-nome="' + nomeFilho + '"]').data('pai');
		return $('[data-nome="' + nomePai + '"]');
	},
	getNaoPais: function () {
		return $('.filho').not('.pai');
	},
	getTios: function (item) {
		return $(item)
			.siblings('.pai')
			.get()
			.map(function (pai) {
			return $(pai).data('nome');
		});
	}
};
