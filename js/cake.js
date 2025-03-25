$(window).load(function () {
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function () {
	var vw;
	$(window).resize(function () {
		vw = $(window).width() / 2;
		$('#b1,#b2,#b3,#b4,#b5,#b6').stop();
		$('#b11').animate({ top: 240, left: vw - 350 }, 500);
		$('#b22').animate({ top: 240, left: vw - 250 }, 500);
		$('#b33').animate({ top: 240, left: vw - 150 }, 500);
		$('#b44').animate({ top: 240, left: vw - 50 }, 500);
		$('#b55').animate({ top: 240, left: vw + 50 }, 500);
		$('#b66').animate({ top: 240, left: vw + 150 }, 500);
	});

	$('#turn_on').click(function () {
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(5000).promise().done(function () {
			$('#play').fadeIn('slow');
		});
	});
	$('#play').click(function () {
		var audio = $('.song')[0];
		audio.play();
		$('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color', '#FFF');
		$('body').addClass('peach-after');
		$(this).fadeOut('slow').delay(6000).promise().done(function () {
			$('#banner_coming').fadeIn('slow');
		});
	});

	$('#banner_coming').click(function () {
		$('.banner').css('display', 'block'); // Make the banner visible
		$('.banner').addClass('banner-come');
		$(this).fadeOut('slow').delay(6000).promise().done(function () {
			$('#balloons_flying').fadeIn('slow');
		});

    });

	function loopOne() {
		var randleft = 1000 * Math.random();
		var randtop = 500 * Math.random();
		$('#b1').animate({ left: randleft, bottom: randtop }, 10000, function () {
			loopOne();
		});
	}
	function loopTwo() {
		var randleft = 1000 * Math.random();
		var randtop = 500 * Math.random();
		$('#b2').animate({ left: randleft, bottom: randtop }, 10000, function () {
			loopTwo();
		});
	}
	function loopThree() {
		var randleft = 1000 * Math.random();
		var randtop = 500 * Math.random();
		$('#b3').animate({ left: randleft, bottom: randtop }, 10000, function () {
			loopThree();
		});
	}
	function loopFour() {
		var randleft = 1000 * Math.random();
		var randtop = 500 * Math.random();
		$('#b4').animate({ left: randleft, bottom: randtop }, 10000, function () {
			loopFour();
		});
	}
	function loopFive() {
		var randleft = 1000 * Math.random();
		var randtop = 500 * Math.random();
		$('#b5').animate({ left: randleft, bottom: randtop }, 10000, function () {
			loopFive();
		});
	}

	function loopSix() {
		var randleft = 1000 * Math.random();
		var randtop = 500 * Math.random();
		$('#b6').animate({ left: randleft, bottom: randtop }, 10000, function () {
			loopSix();
		});
	}


	$('#balloons_flying').click(function () {
		$('.balloon-border').animate({ top: -500 }, 8000);
		$('.balloons').css({
			'display' : 'block',
		});
		$('#b1,#b4,#b5').addClass('balloons-rotate-behaviour-one');
		$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b3').addClass('balloons-rotate-behaviour-two');
		// $('#b4').addClass('balloons-rotate-behaviour-one');
		// $('#b5').addClass('balloons-rotate-behaviour-one');
		// $('#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b7').addClass('balloons-rotate-behaviour-one');
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();

		$(this).fadeOut('slow').delay(5000).promise().done(function () {
			$('#cake_fadein').fadeIn('slow');
		});
	});

	$('#cake_fadein').click(function () {
		$('.cake').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function () {
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function () {
		$('.flame,.glow,.blinking-blow').fadeIn('slow');
		$(this).fadeOut('slow').promise().done(function () {
			$('#blow_candle').fadeIn('slow');
		});
	});

	$('#blow_candle').click(function () {
		vw = $(window).width() / 2;

		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		$('#b1').attr('id', 'b11');
		$('#b2').attr('id', 'b22')
		$('#b3').attr('id', 'b33')
		$('#b4').attr('id', 'b44')
		$('#b5').attr('id', 'b55')
		$('#b6').attr('id', 'b66')
		$('#b7').attr('id', 'b77')
		$('#b11').animate({ top: 240, left: vw - 300 }, 500);
		$('#b22').animate({ top: 240, left: vw - 200 }, 500);
		$('#b33').animate({ top: 240, left: vw - 100 }, 500);
		$('#b44').animate({ top: 240, left: vw  }, 500);
		$('#b55').animate({ top: 240, left: vw + 100 }, 500);
		$('#b66').animate({ top: 240, left: vw + 200 }, 500);
		$('#b77').animate({ top: 240, left: vw + 300 }, 500);
		$('.balloons').css('opacity', '0.9');
		$('.balloons h2').fadeIn(3000);
		$('.flame, .glow, .blinking-blow').fadeOut('slow', function () {
			$('.smoke').fadeIn(10).addClass('show-smoke'); // Smoke appears after flame disappears
		});

		$(this).fadeOut('slow').promise().done(function () {
			$('#cut_cake').fadeIn('slow'); // Show Cut Cake button
		});
	});



	$('#cut_cake').click(function () {
		// Fade out the "Cut Cake" button after clicking
		$(this).fadeOut('slow');
	
		// Show the knife first
		$('.knife').css({
			'display': 'block',
			'opacity': '1',
			'transform': 'rotate(20deg)'
		});
	
		setTimeout(() => {
			const knife = $('.knife-container');
			const slice = $('.slice-container');
	
			// Make the knife shake before cutting
			knife.addClass('shake');
	
			setTimeout(() => {
				// Stop shaking and perform the cut
				knife.removeClass('shake').addClass('cut');
	
				setTimeout(() => {
					// Hide the knife after cutting
					knife.fadeOut();
	
					// **Apply the cake cutting effect**
					$('.layer-bottom, .layer-middle, .layer-top, .icing').addClass('cut');
					$(".cake-container").animate({ left: "-=170px" }, 1000);
	
					// **Show Cake Crumbs AFTER cutting effect**
					setTimeout(() => {
						$('.cake-crumbs').css('display', 'block').animate({ opacity: 1 }, 500);
	
						// **Wait for crumbs to appear, THEN move the cake slice**
						setTimeout(() => {
							slice.addClass('active');
	
							$('.slice-container, .slice-plate, .cake-slice').css({
								'display': 'block',
								'opacity': '1'
							}).animate({
								right: '15%'
							}, 1000);
	
							$('.cake').addClass('cut-cake');
							$('.slice-plate').fadeIn('slow');
	
							// **Now wait until slice animation completes, THEN show "Unwrap Gift" button**
							setTimeout(() => {
								$('#unwrap_surprise').fadeIn('slow');
							}, 1200); // Adjust delay so button appears AFTER slice animation
	
						}, 800); // Wait 800ms after crumbs before moving slice
	
					}, 400); // Delay crumbs appearance after the cutting effect
	
				}, 500); // Delay for knife animation
	
			}, 1000); // Delay for knife shake
	
		}, 500); // Short delay before knife starts
	});
	
	
	

	$('#unwrap_surprise').click(function () {
		window.location.href = "gift.html";
		// vw = $(window).width() / 2;

		// $('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		// $('#b1').attr('id', 'b11');
		// $('#b2').attr('id', 'b22')
		// $('#b3').attr('id', 'b33')
		// $('#b4').attr('id', 'b44')
		// $('#b5').attr('id', 'b55')
		// $('#b6').attr('id', 'b66')
		// $('#b7').attr('id', 'b77')
		// $('#b11').animate({ top: 240, left: vw - 350 }, 500);
		// $('#b22').animate({ top: 240, left: vw - 250 }, 500);
		// $('#b33').animate({ top: 240, left: vw - 150 }, 500);
		// $('#b44').animate({ top: 240, left: vw - 50 }, 500);
		// $('#b55').animate({ top: 240, left: vw + 50 }, 500);
		// $('#b66').animate({ top: 240, left: vw + 150 }, 500);
		// $('#b77').animate({ top: 240, left: vw + 250 }, 500);
		// $('.balloons').css('opacity', '0.9');
		// $('.balloons h2').fadeIn(3000);
		// $(this).fadeOut('slow').delay(3000).promise().done(function () {
		// 	$('#story').fadeIn('slow');
		// });
	});

	// $('#story').click(function () {
	// 	$(this).fadeOut('slow');
	// 	$('.cake').fadeOut('fast').promise().done(function () {
	// 		$('.message').fadeIn('slow');
	// 	});

	// 	var i;

	// 	function msgLoop(i) {
	// 		$("p:nth-child(" + i + ")").fadeOut('slow').delay(800).promise().done(function () {
	// 			i = i + 1;
	// 			$("p:nth-child(" + i + ")").fadeIn('slow').delay(1000);
	// 			if (i == 50) {
	// 				$("p:nth-child(49)").fadeOut('slow').promise().done(function () {
	// 					$('.cake').fadeIn('fast');
	// 				});

	// 			}
	// 			else {
	// 				msgLoop(i);
	// 			}

	// 		});
	// 		// body...
	// 	}

	// 	msgLoop(0);

	// });

});


