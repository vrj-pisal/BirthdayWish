$(window).load(function () {
	$('.loading').fadeOut('fast');
	$('.container').fadeIn('fast');
});
$('document').ready(function () {
	var vw;
  // Function to handle responsive adjustments
  function responsiveAdjustments() {
    vw = $(window).width() / 2;

    // Adjust animation based on screen size
    if ($(window).width() <= 576) {
      // Mobile screens
      $("#b11").animate({ top: 200, left: vw - 120 }, 500);
      $("#b22").animate({ top: 200, left: vw - 80 }, 500);
      $("#b33").animate({ top: 200, left: vw - 40 }, 500);
      $("#b44").animate({ top: 200, left: vw }, 500);
      $("#b55").animate({ top: 200, left: vw + 40 }, 500);
      $("#b66").animate({ top: 200, left: vw + 80 }, 500);
    } else if ($(window).width() <= 768) {
      // Tablet screens
      $("#b11").animate({ top: 220, left: vw - 200 }, 500);
      $("#b22").animate({ top: 220, left: vw - 150 }, 500);
      $("#b33").animate({ top: 220, left: vw - 80 }, 500);
      $("#b44").animate({ top: 220, left: vw - 10 }, 500);
      $("#b55").animate({ top: 220, left: vw + 60 }, 500);
      $("#b66").animate({ top: 220, left: vw + 110 }, 500);
    } else {
      // Desktop screens
      $("#b11").animate({ top: 240, left: vw - 350 }, 500);
      $("#b22").animate({ top: 240, left: vw - 250 }, 500);
      $("#b33").animate({ top: 240, left: vw - 150 }, 500);
      $("#b44").animate({ top: 240, left: vw - 50 }, 500);
      $("#b55").animate({ top: 240, left: vw + 50 }, 500);
      $("#b66").animate({ top: 240, left: vw + 150 }, 500);
    }
  }

  // Handle window resize
	$(window).resize(function () {
    $("#b1,#b2,#b3,#b4,#b5,#b6").stop();
    responsiveAdjustments();
  });

  // Initial call to set positions
  responsiveAdjustments();

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

	  function getRandomSpeed() {
      // Slower movement on mobile for better performance
      return $(window).width() < 768 ? 12000 : 10000;
    }
  
    // Adjust random positions to keep balloons within viewport
    function getRandomLeft() {
      return $(window).width() * 0.8 * Math.random();
    }
  
    function getRandomBottom() {
      return $(window).height() *  (0.5 + 0.1  * Math.random());
    }

	function loopOne() {
      var randleft = getRandomLeft();
      var randtop = getRandomBottom();
      $("#b1").animate(
        { left: randleft, bottom: randtop },
        getRandomSpeed(),
        function () {
			loopOne();
        }
      );
	}
	function loopTwo() {
      var randleft = getRandomLeft();
      var randtop = getRandomBottom();
      $("#b2").animate(
        { left: randleft, bottom: randtop },
        getRandomSpeed(),
        function () {
			loopTwo();
        }
      );
	}
	function loopThree() {
      var randleft = getRandomLeft();
      var randtop = getRandomBottom();
      $("#b3").animate(
        { left: randleft, bottom: randtop },
        getRandomSpeed(),
        function () {
			loopThree();
        }
      );
	}
	function loopFour() {
      var randleft = getRandomLeft();
      var randtop = getRandomBottom();
      $("#b4").animate(
        { left: randleft, bottom: randtop },
        getRandomSpeed(),
        function () {
			loopFour();
        }
      );
	}
	function loopFive() {
      var randleft = getRandomLeft();
      var randtop = getRandomBottom();
      $("#b5").animate(
        { left: randleft, bottom: randtop },
        getRandomSpeed(),
        function () {
			loopFive();
        }
      );
	}

	function loopSix() {
      var randleft = getRandomLeft();
      var randtop = getRandomBottom();
      $("#b6").animate(
        { left: randleft, bottom: randtop },
        getRandomSpeed(),
        function () {
			loopSix();
        }
      );
    }


	  $("#balloons_flying").click(function () {
      // Show and animate balloon border
      $(".balloon-border").addClass("visible");
      $(".balloon-border").animate({ top: -500 }, 8000);
  
      // Show and animate balloons, but ensure h2 elements remain hidden
      $(".balloons").css({
          display: "block",
      });
      $(".balloons h2").css("display", "none"); // Ensure h2 elements remain hidden
      $("#b1,#b4,#b5").addClass("balloons-rotate-behaviour-one");
      $("#b2,#b3,#b6").addClass("balloons-rotate-behaviour-two");
		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();

      $(this)
          .fadeOut("slow")
          .delay(5000)
          .promise()
          .done(function () {
              $("#cake_fadein").fadeIn("slow");
              // Hide balloon border after animations
              $(".balloon-border").removeClass("visible");
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

  $("#blow_candle").click(function () {
    // Show the first popup when blow candle button is clicked
    $("#popup-forgot-wish").addClass("active");
    
    // When "Continue" is clicked on first popup
    $("#next-popup-btn").click(function() {
      // Hide first popup
      $("#popup-forgot-wish").removeClass("active");
      
      // Show second popup with wish making dots
      $("#popup-make-wish").addClass("active");
      $(".making-wish").css("display", "block");
      
      // Initially hide the Done button
      $("#wish-done-btn").css("opacity", "0");
      
      // Slowly fade in the Done button after 3 seconds
      setTimeout(function() {
        $("#wish-done-btn").animate({opacity: 1}, 1000);
      }, 3000);
      
      // When Done button is clicked
      $("#wish-done-btn").off("click").on("click", function() {
        // Hide second popup
        $("#popup-make-wish").removeClass("active");
        
        // Show third popup with wish journey message
        $("#popup-wish-journey").addClass("active");
        
        // When final Continue button is clicked
        $("#complete-wish-btn").off("click").on("click", function() {
          // Fade out the final popup with a slow animation
          $("#popup-wish-journey").fadeOut(2000, function() {
            // Remove active class after fade out completes
            $(this).removeClass("active");
          });
          
          // Add a timeout before proceeding with the candle blowing animation
          setTimeout(function() {
            // Now proceed with the original blow candle functionality
            // Blow out flame and show smoke
            $(".flame").fadeOut("fast");
            $(".glow").fadeOut("fast");
            $(".blinking-blow").fadeOut("fast");
            $(".smoke").css("display", "block").fadeIn("fast").addClass("show-smoke");

            // Stop all balloon animations
            $("#b1,#b2,#b3,#b4,#b5,#b6").stop();

            // Change balloon IDs for positioning
            $("#b1").attr("id", "b11");
            $("#b2").attr("id", "b22");
            $("#b3").attr("id", "b33");
            $("#b4").attr("id", "b44");
            $("#b5").attr("id", "b55");
            $("#b6").attr("id", "b66");
            
            // Ensure the balloon divs will be visible with their text
            $(".balloons div").css("display", "block");

            // Get banner dimensions
            let banner = $(".banner");
            let bannerWidth = banner.width();
            let bannerLeft = banner.offset().left;
            let bannerRight = bannerLeft + bannerWidth;
            let screenWidth = $(window).width();
            let topPosition;

            // Set vertical position based on screen size
            if (screenWidth <= 320) {
              topPosition = 150; // Add more space below banner
            } else if (screenWidth <= 375) {
              topPosition = 160; // Add more space below banner
            } else if (screenWidth <= 425) {
              topPosition = 170; // Add more space below banner
            } else if (screenWidth <= 576) {
              topPosition = 180; // Add more space below banner
            } else {
              topPosition = 210; // Add more space below banner
            }

            // Calculate balloon size based on screen size
            let balloonWidth;
            if (screenWidth <= 400) {
              balloonWidth = 60;
            } else if (screenWidth <= 576) {
              balloonWidth = 70;
            } else if (screenWidth <= 768) {
              balloonWidth = 80;
            } else {
              balloonWidth = 100;
            }

            // Calculate spacing between balloons for 6 balloons (needs 5 spaces)
            // We need to leave space for the balloon width at the start and end
            let usableWidth = bannerWidth - balloonWidth;
            let spacing = usableWidth / 5;

            // First balloon at the left edge of banner, last at the right edge
            let startPosition = bannerLeft;

            // Set balloon backgrounds and ensure visibility
            $(".balloons").css("opacity", "1");
            $(".balloons-container").css("opacity", "1");

            // Set background images for balloons
            $("#b11").css("background-image", 'url("assets/images/b1.png")');
            $("#b22").css("background-image", 'url("assets/images/b2.png")');
            $("#b33").css("background-image", 'url("assets/images/b3.png")');
            $("#b44").css("background-image", 'url("assets/images/b4.png")');
            $("#b55").css("background-image", 'url("assets/images/b5.png")');
            $("#b66").css("background-image", 'url("assets/images/b6.png")');

            // Add letter content to each balloon with colors matching their balloons and staggered animation
            $("#b11").html(
              '<div style="color:rgb(242, 179, 0); animation-delay: 0s;">R</div>'
            );
            $("#b22").html(
              '<div style="color:rgb(7, 25, 212); animation-delay: 0.3s;">U</div>'
            );
            $("#b33").html(
              '<div style="color:rgb(209, 77, 57); animation-delay: 0.6s;">T</div>'
            );
            $("#b44").html(
              '<div style="color:rgb(143, 173, 0); animation-delay: 0.9s;">U</div>'
            );
            $("#b55").html(
              '<div style="color:rgb(131, 119, 228); animation-delay: 1.2s;">J</div>'
            );
            $("#b66").html(
              '<div style="color:rgb(32, 207, 180); animation-delay: 1.5s;">A</div>'
            );

            // Animate balloons from initial positions to span across the banner
            $("#b11").animate({ top: topPosition, left: startPosition }, 1000);
            $("#b22").animate(
              { top: topPosition, left: startPosition + spacing },
              1000
            );
            $("#b33").animate(
              { top: topPosition, left: startPosition + spacing * 2 },
              1000
            );
            $("#b44").animate(
              { top: topPosition, left: startPosition + spacing * 3 },
              1000
            );
            $("#b55").animate(
              { top: topPosition, left: startPosition + spacing * 4 },
              1000
            );
            $("#b66").animate(
              { top: topPosition, left: bannerRight - balloonWidth },
              1000
            );

            // Show the cut cake button after animation completes
            $("#blow_candle")
              .fadeOut("slow")
              .promise()
              .done(function () {
                setTimeout(function () {
                  $("#cut_cake").fadeIn("slow");
                }, 1000);
              });
          }, 2500); // Wait for the popup to finish fading out (2000ms) plus extra time (500ms)
        });
      });
    });
  });

	$('#cut_cake').click(function () {
		// Fade out the "Cut Cake" button after clicking
		$(this).fadeOut('slow');
	
		// Set knife position based on screen size
		const screenWidth = $(window).width();
		let knifeTop, knifeLeft, knifeRotation;
		
		// Adjust knife position based on screen size
		if (screenWidth <= 320) {
			knifeTop = '25%';
			// knifeLeft = '38%';
			knifeRotation = '15deg';
		} else if (screenWidth <= 375) {
			knifeTop = '28%';
			// knifeLeft = '40%';
			knifeRotation = '18deg';
		} else if (screenWidth <= 425) {
			knifeTop = '30%';
			// knifeLeft = '42%';
			knifeRotation = '20deg';
		} else if (screenWidth <= 600) {
			knifeTop = '35%';
			// knifeLeft = '45%';
			knifeRotation = '20deg';
		} else if (screenWidth <= 768) {
			knifeTop = '40%';
			// knifeLeft = '48%';
			knifeRotation = '20deg';
		}
		
		// Show the knife first with adjusted position
		$('.knife').css({
			'display': 'block',
			'opacity': '1',
			'transform': 'rotate(' + knifeRotation + ')'
		});
		
		// Position knife container
		$('.knife-container').css({
			'top': knifeTop,
			// 'left': knifeLeft
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
	
					// Apply the cake cutting effect
					$('.layer-bottom, .layer-middle, .layer-top, .icing').addClass('cut');
					
					// Add the "cake-cut" class to cake-wrapper for responsive scaling
					$('.cake-wrapper').addClass('cake-cut');
	
					// Wait for the scaling transition to complete before moving the cake
					setTimeout(() => {
						// Adjust how far to move the cake based on screen size
						// let moveDistance;
						// if (screenWidth <= 375) {
						// 	moveDistance = 120;
						// } else if (screenWidth <= 425) {
						// 	moveDistance = 140;
						// } else if (screenWidth <= 600) {
						// 	moveDistance = 150;
						// } else {
						// 	moveDistance = 170;
						// }
						
						$(".cake-container").animate({ left: "-=" + 176 + "px" }, 1000);
			
						// Show Cake Crumbs AFTER cutting effect
						setTimeout(() => {
							$('.cake-crumbs').css('display', 'block').animate({ opacity: 1 }, 500);
			
								// Wait for crumbs to appear, THEN move the cake slice
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
	
									// Now wait until slice animation completes, THEN show "Unwrap Gift" button
							setTimeout(() => {
								$('#unwrap_surprise').fadeIn('slow');
							}, 1200); // Adjust delay so button appears AFTER slice animation
	
						}, 800); // Wait 800ms after crumbs before moving slice
	
					}, 400); // Delay crumbs appearance after the cutting effect
						}, 800); // Wait for scaling transition to complete
	
				}, 500); // Delay for knife animation
	
			}, 1000); // Delay for knife shake
	
		}, 500); // Short delay before knife starts
	});

	$('#unwrap_surprise').click(function () {
		window.location.href = "gift.html";
	});

});

// Add window resize handler for balloon spacing
$(window).resize(function () {
  // Only reposition if the balloons are set up as the name (if they have the new IDs)
  if ($("#b11").length > 0) {
    // Get banner dimensions
    let banner = $(".banner");
    let bannerWidth = banner.width();
    let bannerLeft = banner.offset().left;
    let bannerRight = bannerLeft + bannerWidth;
    let screenWidth = $(window).width();
    let topPosition;

    // Set vertical position based on screen size
    if (screenWidth <= 320) {
      topPosition = 150; // Add more space below banner
    } else if (screenWidth <= 375) {
      topPosition = 160; // Add more space below banner
    } else if (screenWidth <= 425) {
      topPosition = 170; // Add more space below banner
    } else if (screenWidth <= 576) {
      topPosition = 180; // Add more space below banner
    } else {
      topPosition = 210; // Add more space below banner
    }

    // Calculate balloon size based on screen size
    let balloonWidth;
    if (screenWidth <= 400) {
      balloonWidth = 60;
    } else if (screenWidth <= 576) {
      balloonWidth = 70;
    } else if (screenWidth <= 768) {
      balloonWidth = 80;
    } else {
      balloonWidth = 100;
    }

    // Calculate spacing between balloons for 6 balloons (needs 5 spaces)
    // We need to leave space for the balloon width at the start and end
    let usableWidth = bannerWidth - balloonWidth;
    let spacing = usableWidth / 5;

    // First balloon at the left edge of banner, last at the right edge
    let startPosition = bannerLeft;

    // Reposition each balloon immediately without animation for smooth response
    $("#b11").css({ top: topPosition, left: startPosition });
    $("#b22").css({ top: topPosition, left: startPosition + spacing });
    $("#b33").css({ top: topPosition, left: startPosition + spacing * 2 });
    $("#b44").css({ top: topPosition, left: startPosition + spacing * 3 });
    $("#b55").css({ top: topPosition, left: startPosition + spacing * 4 });
    $("#b66").css({ top: topPosition, left: bannerRight - balloonWidth });

    // Make sure the balloon text colors are maintained with animation delays
    $("#b11 div").attr("style", "color:rgb(242, 179, 0); animation-delay: 0s;");
    $("#b22 div").attr(
      "style",
      "color:rgb(7, 25, 212); animation-delay: 0.3s;"
    );
    $("#b33 div").attr(
      "style",
      "color:rgb(209, 77, 57); animation-delay: 0.6s;"
    );
    $("#b44 div").attr(
      "style",
      "color:rgb(143, 173, 0); animation-delay: 0.9s;"
    );
    $("#b55 div").attr(
      "style",
      "color:rgb(131, 119, 228); animation-delay: 1.2s;"
    );
    $("#b66 div").attr(
      "style",
      "color:rgb(32, 207, 180); animation-delay: 1.5s;"
    );
  }
});


