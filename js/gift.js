let isOpening = false;
let animationComplete = false;
let shootingStarCreated = false;

document.addEventListener("DOMContentLoaded", function () {
    const box = document.querySelector(".box-body");
    const giftMessage = document.getElementById("giftMessage");
    let gifts = Array.from(document.querySelectorAll(".img"));
    let shuffledGifts = [];
    let currentGiftIndex = 0;

    const originalMessage = "🎉 Tap the Gift to Open! 🎁";
    const openedMessage = "✨ Unwrapping your surprise... ✨";

    function shuffleGifts() {
        shuffledGifts = [...gifts].sort(() => Math.random() - 0.5);
    }

    function resetGifts() {
        gifts.forEach(gift => {
            gift.style.opacity = "0";
            gift.style.display = "none";
            gift.style.visibility = "hidden";
        });
        currentGiftIndex = 0;
        animationComplete = false;
    }

    function positionGift(gift) {
        const messageRect = giftMessage.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();
        
        const middleY = (messageRect.bottom + boxRect.top) / 2; // Find middle position
        const middleX = (boxRect.left + boxRect.right) / 2;

        gift.style.position = "absolute";
        gift.style.display = "block";
    }

    function createStarryBackground() {
        const starsContainer = document.querySelector('.stars-container');
        const stars = [];
        
        // Create stars
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            
            // Random position
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Random size (1-3px)
            const size = Math.random() * 2 + 1;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            
            // Random twinkle delay
            star.style.animationDelay = `${Math.random() * 4}s`;
            
            starsContainer.appendChild(star);
            stars.push(star);
        }
        
        return stars;
    }

    function createFinalMessage() {
        const finalMessage = document.createElement('div');
        finalMessage.className = 'final-message';
        
        // Different content for different screen sizes
        let lines;
        
        if (window.innerWidth <= 480) {
            // Mobile version - shorter lines
            lines = [
                'And as this celebration fades into the night,',
                'know that somewhere, someone is',
                'silently wishing you all the happiness',
                'in the world.',
                'Happy birthday once again.',
                '',
                'Remember—<span class="highlight">every star has a story.</span>',
                '<span class="highlight">This one is yours.</span>'
            ];
        } else {
            // Desktop version
            lines = [
                'And as this celebration fades into the night,',
                'know that somewhere, someone is silently wishing you',
                'all the happiness in the world.',
                'Happy birthday once again.',
                '',
                'Remember—<span class="highlight">every star has a story.</span>',
                '<span class="highlight">This one is yours.</span>'
            ];
        }
        
        lines.forEach(line => {
            const lineDiv = document.createElement('div');
            lineDiv.className = 'line';
            lineDiv.innerHTML = line;
            finalMessage.appendChild(lineDiv);
        });
        
        document.querySelector('.container').appendChild(finalMessage);
        
        // Add resize handler to adjust content if window size changes
        const resizeHandler = () => {
            const existingMessage = document.querySelector('.final-message');
            if (existingMessage) {
                document.querySelector('.container').removeChild(existingMessage);
                createFinalMessage();
            }
        };
        
        // Debounce the resize handler for better performance
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeHandler, 250);
        });
        
        return finalMessage;
    }

    function animateLines(finalMessage) {
        const lines = finalMessage.querySelectorAll('.line');
        
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.classList.add('show');
            }, index * 800); // Show each line with a delay
        });
    }

    function fadeOutElements() {
        // First sequence: message, gifts, and box
        const firstSequence = [
            { element: document.querySelector('.message'), delay: 1000 },
            { element: document.querySelectorAll('.img')[2], delay: 2000 }, // Last gift
            { element: document.querySelectorAll('.img')[1], delay: 2500 }, // Second gift
            { element: document.querySelectorAll('.img')[0], delay: 3000 }, // First gift
            { element: document.querySelector('.box'), delay: 4000 }
        ];

        // Apply first sequence
        firstSequence.forEach(({element, delay}) => {
            if (element) {
                setTimeout(() => {
                    if (!isOpening || !animationComplete) return;
                    element.classList.add('fade-out');
                }, delay);
            }
        });
        
        // Then after a pause, fade out the confetti background
        setTimeout(() => {
            if (!isOpening || !animationComplete) return;
            
            const confetti = document.querySelector('#confetti');
            if (confetti) {
                confetti.classList.add('fade-out');
            }

            // Start the night sky transition
            startNightSkyTransition();
        }, 5000); // Start night sky after elements fade out
    }

    function createShootingStar() {
        // Remove any existing shooting stars first
        const existingStars = document.querySelectorAll('.shooting-star');
        existingStars.forEach(star => star.remove());
        
        const star = document.createElement("span");
        star.classList.add("shooting-star");

        // Position near the moon (top right corner)
        const moon = document.querySelector('.moon');
        let startX, startY;
        
        if (moon) {
            const moonRect = moon.getBoundingClientRect();
            // Position slightly to the left and below the moon
            startX = moonRect.left - 10;
            startY = moonRect.bottom + 20; // Position below the moon
        } else {
            // Fallback if moon element not found
            startX = window.innerWidth * 0.8; // 80% from left
            startY = window.innerHeight * 0.2; // 20% from top
        }

        star.style.top = startY + "px";
        star.style.left = startX + "px";
        
        // Add to the container instead of document.body to prevent scrollbars
        const container = document.querySelector('.container');
        container.appendChild(star);

        // Move diagonally
        star.style.setProperty('--endX', startX - 300 + "px");
        star.style.setProperty('--endY', startY + 300 + "px");

        setTimeout(() => {
            star.remove();
        }, 3000);
    }

    function startNightSkyTransition() {
        // Create starry background
        const container = document.querySelector('.container');
        
        // Create and append starry background if it doesn't exist
        let starryBackground = document.querySelector('.starry-background');
        if (!starryBackground) {
            starryBackground = document.createElement('div');
            starryBackground.className = 'starry-background';
            container.appendChild(starryBackground);
        }

        // Create and append moon if it doesn't exist
        let moon = starryBackground.querySelector('.moon');
        if (!moon) {
            moon = document.createElement('img');
            moon.src = 'assets/images/moon.png';
            moon.alt = 'Moon';
            moon.className = 'moon';
            starryBackground.appendChild(moon);
        }

        // Create and append stars container if it doesn't exist
        let starsContainer = starryBackground.querySelector('.stars-container');
        if (!starsContainer) {
            starsContainer = document.createElement('div');
            starsContainer.className = 'stars-container';
            starryBackground.appendChild(starsContainer);
        }

        // Create stars
        for (let i = 0; i < 100; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            const size = Math.random() * 2 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.animationDelay = Math.random() * 4 + 's';
            starsContainer.appendChild(star);
        }

        // Create and append clouds if they don't exist
        let clouds = starryBackground.querySelector('.clouds');
        if (!clouds) {
            clouds = document.createElement('div');
            clouds.className = 'clouds';
            starryBackground.appendChild(clouds);
        }

        // Show elements with proper timing
        requestAnimationFrame(() => {
            // Show background first
            starryBackground.classList.add('show');
            
            // Show moon after a short delay
            setTimeout(() => {
                moon.classList.add('show');
                
                // Show stars gradually
                const stars = starsContainer.querySelectorAll('.star');
                stars.forEach((star, index) => {
                    setTimeout(() => {
                        star.classList.add('show');
                    }, index * 20);
                });

                // Show clouds
                setTimeout(() => {
                    clouds.classList.add('show');
                    
                    // Create and show final message
                    setTimeout(() => {
                        const finalMessage = createFinalMessage();
                        animateLines(finalMessage);

                        // Make final message disappear after 10 seconds
                        setTimeout(() => {
                            finalMessage.classList.add('fade-out');
                            
                            // Create a single shooting star after final message fades
                            setTimeout(() => {
                                // Only create shooting star if it hasn't been created yet
                                if (!shootingStarCreated) {
                                    shootingStarCreated = true;
                                    createShootingStar();
                                }
                            }, 2000); // Wait for fade-out animation to complete
                        }, 10000); // 10 seconds reading time
                    }, 1000);
                }, 1500);
            }, 500);
        });
    }

    function revealGifts() {
        if (!isOpening) return;

        if (currentGiftIndex < shuffledGifts.length) {
            setTimeout(() => {
                // If box was closed during timeout, stop the animation
                if (!isOpening) return;

                if (currentGiftIndex > 0) {
                    shuffledGifts[currentGiftIndex - 1].style.opacity = "0";
                    shuffledGifts[currentGiftIndex - 1].style.display = "none";
                    shuffledGifts[currentGiftIndex - 1].style.visibility = "hidden";
                }

                const gift = shuffledGifts[currentGiftIndex];
                positionGift(gift);
                
                gift.style.opacity = "1";
                gift.style.visibility = "visible";

                currentGiftIndex++;

                if (currentGiftIndex < shuffledGifts.length) {
                    let delay = 2000;
                    setTimeout(revealGifts, delay);
                } else {
                    // All gifts have been revealed
                    setTimeout(() => {
                        if (!isOpening) return; // Check again after timeout
                        
                        giftMessage.textContent = "No magic portal yet, so here's a virtual gift—unwrap it in your mind with full 4D effects and a sprinkle of joy! 😊🎁";
                        animationComplete = true; // Mark animation as complete
                        
                        // Start ending sequence after 3 seconds
                        setTimeout(() => {
                            if (!isOpening || !animationComplete) return; // Verify we're still in animation mode
                            
                            const totalFadeOutDuration = fadeOutElements();
                            
                            // Create starry background - start fading in after box fades but before confetti fully fades
                            setTimeout(() => {
                                if (!isOpening || !animationComplete) return; // Final verification
                                
                                startNightSkyTransition();
                            }, 5500); // Start after box fades (4s + 1.5s)
                        }, 3000);
                    }, 500);
                }
            }, 500);
        }
    }

    function toggleBox(event) {
        event.stopPropagation();
        
        if (box.classList.contains("open")) {
            closeBox();
        } else {
            openBox();
        }
    }

    function openBox() {
        box.classList.add("open");
        giftMessage.textContent = openedMessage;
        isOpening = true;
        shuffleGifts();
        revealGifts();
    }

    function closeBox() {
        box.classList.remove("open");
        giftMessage.textContent = originalMessage;
        isOpening = false;
        animationComplete = false;
        
        // Remove fade-out classes
        document.querySelectorAll('.fade-out').forEach(el => {
            el.classList.remove('fade-out');
        });
        
        // Clean up night sky elements
        const starryBackground = document.querySelector('.starry-background');
        const finalMessage = document.querySelector('.final-message');
        
        if (starryBackground) {
            starryBackground.classList.remove('show');
            // Remove all children elements' show classes
            starryBackground.querySelectorAll('.moon, .star, .clouds').forEach(el => {
                el.classList.remove('show');
            });
            // Remove the starry background after transition
            setTimeout(() => {
                if (starryBackground.parentNode) {
                    starryBackground.parentNode.removeChild(starryBackground);
                }
            }, 2000);
        }
        
        if (finalMessage) {
            finalMessage.remove();
        }
        
        resetGifts();
    }

    box.addEventListener("click", toggleBox);

    window.addEventListener("resize", () => {
        if (isOpening && currentGiftIndex > 0 && currentGiftIndex <= shuffledGifts.length) {
            positionGift(shuffledGifts[currentGiftIndex - 1]);
        }
    });

    resetGifts();
});








// Confetti function
function startConfetti() {
  const duration = 1500; // 1.5 seconds confetti
  const end = Date.now() + duration;
  
  // Get the gift box's position dynamically
  const box = document.querySelector(".box-body");
  const boxRect = box.getBoundingClientRect();
  
  // Calculate the origin based on the box position
  const originY = (boxRect.top + boxRect.height / 6) / window.innerHeight;

  (function frame() {
      confetti({
          particleCount: 5,
          spread: 60,
          origin: { y: originY } // Use dynamic origin based on the box position
      });

      if (Date.now() < end) {
          requestAnimationFrame(frame);
      }
  })();
}

var retina = window.devicePixelRatio,

    // Math shorthands
    PI = Math.PI,
    sqrt = Math.sqrt,
    round = Math.round,
    random = Math.random,
    cos = Math.cos,
    sin = Math.sin,

    // Local WindowAnimationTiming interface
    rAF = window.requestAnimationFrame,
    cAF = window.cancelAnimationFrame || window.cancelRequestAnimationFrame,
    _now = Date.now || function () {return new Date().getTime();};

// Local WindowAnimationTiming interface polyfill
(function (w) {
  /**
				* Fallback implementation.
				*/
  var prev = _now();
  function fallback(fn) {
    var curr = _now();
    var ms = Math.max(0, 16 - (curr - prev));
    var req = setTimeout(fn, ms);
    prev = curr;
    return req;
  }

  /**
				* Cancel.
				*/
  var cancel = w.cancelAnimationFrame
  || w.webkitCancelAnimationFrame
  || w.clearTimeout;

  rAF = w.requestAnimationFrame
  || w.webkitRequestAnimationFrame
  || fallback;

  cAF = function(id){
    cancel.call(w, id);
  };
}(window));

document.addEventListener("DOMContentLoaded", function() {
  var speed = 50,
      duration = (1.0 / speed),
      confettiRibbonCount = 11,
      ribbonPaperCount = 30,
      ribbonPaperDist = 8.0,
      ribbonPaperThick = 8.0,
      confettiPaperCount = 95,
      DEG_TO_RAD = PI / 180,
      RAD_TO_DEG = 180 / PI,
      colors = [
        ["#df0049", "#660671"],
        ["#00e857", "#005291"],
        ["#2bebbc", "#05798a"],
        ["#ffd200", "#b06c00"]
      ];

  function Vector2(_x, _y) {
    this.x = _x, this.y = _y;
    this.Length = function() {
      return sqrt(this.SqrLength());
    }
    this.SqrLength = function() {
      return this.x * this.x + this.y * this.y;
    }
    this.Add = function(_vec) {
      this.x += _vec.x;
      this.y += _vec.y;
    }
    this.Sub = function(_vec) {
      this.x -= _vec.x;
      this.y -= _vec.y;
    }
    this.Div = function(_f) {
      this.x /= _f;
      this.y /= _f;
    }
    this.Mul = function(_f) {
      this.x *= _f;
      this.y *= _f;
    }
    this.Normalize = function() {
      var sqrLen = this.SqrLength();
      if (sqrLen != 0) {
        var factor = 1.0 / sqrt(sqrLen);
        this.x *= factor;
        this.y *= factor;
      }
    }
    this.Normalized = function() {
      var sqrLen = this.SqrLength();
      if (sqrLen != 0) {
        var factor = 1.0 / sqrt(sqrLen);
        return new Vector2(this.x * factor, this.y * factor);
      }
      return new Vector2(0, 0);
    }
  }
  Vector2.Lerp = function(_vec0, _vec1, _t) {
    return new Vector2((_vec1.x - _vec0.x) * _t + _vec0.x, (_vec1.y - _vec0.y) * _t + _vec0.y);
  }
  Vector2.Distance = function(_vec0, _vec1) {
    return sqrt(Vector2.SqrDistance(_vec0, _vec1));
  }
  Vector2.SqrDistance = function(_vec0, _vec1) {
    var x = _vec0.x - _vec1.x;
    var y = _vec0.y - _vec1.y;
    return (x * x + y * y + z * z);
  }
  Vector2.Scale = function(_vec0, _vec1) {
    return new Vector2(_vec0.x * _vec1.x, _vec0.y * _vec1.y);
  }
  Vector2.Min = function(_vec0, _vec1) {
    return new Vector2(Math.min(_vec0.x, _vec1.x), Math.min(_vec0.y, _vec1.y));
  }
  Vector2.Max = function(_vec0, _vec1) {
    return new Vector2(Math.max(_vec0.x, _vec1.x), Math.max(_vec0.y, _vec1.y));
  }
  Vector2.ClampMagnitude = function(_vec0, _len) {
    var vecNorm = _vec0.Normalized;
    return new Vector2(vecNorm.x * _len, vecNorm.y * _len);
  }
  Vector2.Sub = function(_vec0, _vec1) {
    return new Vector2(_vec0.x - _vec1.x, _vec0.y - _vec1.y, _vec0.z - _vec1.z);
  }

  function EulerMass(_x, _y, _mass, _drag) {
    this.position = new Vector2(_x, _y);
    this.mass = _mass;
    this.drag = _drag;
    this.force = new Vector2(0, 0);
    this.velocity = new Vector2(0, 0);
    this.AddForce = function(_f) {
      this.force.Add(_f);
    }
    this.Integrate = function(_dt) {
      var acc = this.CurrentForce(this.position);
      acc.Div(this.mass);
      var posDelta = new Vector2(this.velocity.x, this.velocity.y);
      posDelta.Mul(_dt);
      this.position.Add(posDelta);
      acc.Mul(_dt);
      this.velocity.Add(acc);
      this.force = new Vector2(0, 0);
    }
    this.CurrentForce = function(_pos, _vel) {
      var totalForce = new Vector2(this.force.x, this.force.y);
      var speed = this.velocity.Length();
      var dragVel = new Vector2(this.velocity.x, this.velocity.y);
      dragVel.Mul(this.drag * this.mass * speed);
      totalForce.Sub(dragVel);
      return totalForce;
    }
  }

  function ConfettiPaper(_x, _y) {
    this.pos = new Vector2(_x, _y);
    this.rotationSpeed = (random() * 600 + 800);
    this.angle = DEG_TO_RAD * random() * 360;
    this.rotation = DEG_TO_RAD * random() * 360;
    this.cosA = 1.0;
    this.size = 5.0;
    this.oscillationSpeed = (random() * 1.5 + 0.5);
    this.xSpeed = 40.0;
    this.ySpeed = (random() * 60 + 50.0);
    this.corners = new Array();
    this.time = random();
    var ci = round(random() * (colors.length - 1));
    this.frontColor = colors[ci][0];
    this.backColor = colors[ci][1];
    for (var i = 0; i < 4; i++) {
      var dx = cos(this.angle + DEG_TO_RAD * (i * 90 + 45));
      var dy = sin(this.angle + DEG_TO_RAD * (i * 90 + 45));
      this.corners[i] = new Vector2(dx, dy);
    }
    this.Update = function(_dt) {
      this.time += _dt;
      this.rotation += this.rotationSpeed * _dt;
      this.cosA = cos(DEG_TO_RAD * this.rotation);
      this.pos.x += cos(this.time * this.oscillationSpeed) * this.xSpeed * _dt
      this.pos.y += this.ySpeed * _dt;
      if (this.pos.y > ConfettiPaper.bounds.y) {
        this.pos.x = random() * ConfettiPaper.bounds.x;
        this.pos.y = 0;
      }
    }
    this.Draw = function(_g) {
      if (this.cosA > 0) {
        _g.fillStyle = this.frontColor;
      } else {
        _g.fillStyle = this.backColor;
      }
      _g.beginPath();
      _g.moveTo((this.pos.x + this.corners[0].x * this.size) * retina, (this.pos.y + this.corners[0].y * this.size * this.cosA) * retina);
      for (var i = 1; i < 4; i++) {
        _g.lineTo((this.pos.x + this.corners[i].x * this.size) * retina, (this.pos.y + this.corners[i].y * this.size * this.cosA) * retina);
      }
      _g.closePath();
      _g.fill();
    }
  }
  ConfettiPaper.bounds = new Vector2(0, 0);

  function ConfettiRibbon(_x, _y, _count, _dist, _thickness, _angle, _mass, _drag) {
    this.particleDist = _dist;
    this.particleCount = _count;
    this.particleMass = _mass;
    this.particleDrag = _drag;
    this.particles = new Array();
    var ci = round(random() * (colors.length - 1));
    this.frontColor = colors[ci][0];
    this.backColor = colors[ci][1];
    this.xOff = (cos(DEG_TO_RAD * _angle) * _thickness);
    this.yOff = (sin(DEG_TO_RAD * _angle) * _thickness);
    this.position = new Vector2(_x, _y);
    this.prevPosition = new Vector2(_x, _y);
    this.velocityInherit = (random() * 2 + 4);
    this.time = random() * 100;
    this.oscillationSpeed = (random() * 2 + 2);
    this.oscillationDistance = (random() * 40 + 40);
    this.ySpeed = (random() * 40 + 80);
    for (var i = 0; i < this.particleCount; i++) {
      this.particles[i] = new EulerMass(_x, _y - i * this.particleDist, this.particleMass, this.particleDrag);
    }
    this.Update = function(_dt) {
      var i = 0;
      this.time += _dt * this.oscillationSpeed;
      this.position.y += this.ySpeed * _dt;
      this.position.x += cos(this.time) * this.oscillationDistance * _dt;
      this.particles[0].position = this.position;
      var dX = this.prevPosition.x - this.position.x;
      var dY = this.prevPosition.y - this.position.y;
      var delta = sqrt(dX * dX + dY * dY);
      this.prevPosition = new Vector2(this.position.x, this.position.y);
      for (i = 1; i < this.particleCount; i++) {
        var dirP = Vector2.Sub(this.particles[i - 1].position, this.particles[i].position);
        dirP.Normalize();
        dirP.Mul((delta / _dt) * this.velocityInherit);
        this.particles[i].AddForce(dirP);
      }
      for (i = 1; i < this.particleCount; i++) {
        this.particles[i].Integrate(_dt);
      }
      for (i = 1; i < this.particleCount; i++) {
        var rp2 = new Vector2(this.particles[i].position.x, this.particles[i].position.y);
        rp2.Sub(this.particles[i - 1].position);
        rp2.Normalize();
        rp2.Mul(this.particleDist);
        rp2.Add(this.particles[i - 1].position);
        this.particles[i].position = rp2;
      }
      if (this.position.y > ConfettiRibbon.bounds.y + this.particleDist * this.particleCount) {
        this.Reset();
      }
    }
    this.Reset = function() {
      this.position.y = -random() * ConfettiRibbon.bounds.y;
      this.position.x = random() * ConfettiRibbon.bounds.x;
      this.prevPosition = new Vector2(this.position.x, this.position.y);
      this.velocityInherit = random() * 2 + 4;
      this.time = random() * 100;
      this.oscillationSpeed = random() * 2.0 + 1.5;
      this.oscillationDistance = (random() * 40 + 40);
      this.ySpeed = random() * 40 + 80;
      var ci = round(random() * (colors.length - 1));
      this.frontColor = colors[ci][0];
      this.backColor = colors[ci][1];
      this.particles = new Array();
      for (var i = 0; i < this.particleCount; i++) {
        this.particles[i] = new EulerMass(this.position.x, this.position.y - i * this.particleDist, this.particleMass, this.particleDrag);
      }
    };
    this.Draw = function(_g) {
      for (var i = 0; i < this.particleCount - 1; i++) {
        var p0 = new Vector2(this.particles[i].position.x + this.xOff, this.particles[i].position.y + this.yOff);
        var p1 = new Vector2(this.particles[i + 1].position.x + this.xOff, this.particles[i + 1].position.y + this.yOff);
        if (this.Side(this.particles[i].position.x, this.particles[i].position.y, this.particles[i + 1].position.x, this.particles[i + 1].position.y, p1.x, p1.y) < 0) {
          _g.fillStyle = this.frontColor;
          _g.strokeStyle = this.frontColor;
        } else {
          _g.fillStyle = this.backColor;
          _g.strokeStyle = this.backColor;
        }
        if (i == 0) {
          _g.beginPath();
          _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
          _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
          _g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
          _g.closePath();
          _g.stroke();
          _g.fill();
          _g.beginPath();
          _g.moveTo(p1.x * retina, p1.y * retina);
          _g.lineTo(p0.x * retina, p0.y * retina);
          _g.lineTo(((this.particles[i + 1].position.x + p1.x) * 0.5) * retina, ((this.particles[i + 1].position.y + p1.y) * 0.5) * retina);
          _g.closePath();
          _g.stroke();
          _g.fill();
        } else if (i == this.particleCount - 2) {
          _g.beginPath();
          _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
          _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
          _g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
          _g.closePath();
          _g.stroke();
          _g.fill();
          _g.beginPath();
          _g.moveTo(p1.x * retina, p1.y * retina);
          _g.lineTo(p0.x * retina, p0.y * retina);
          _g.lineTo(((this.particles[i].position.x + p0.x) * 0.5) * retina, ((this.particles[i].position.y + p0.y) * 0.5) * retina);
          _g.closePath();
          _g.stroke();
          _g.fill();
        } else {
          _g.beginPath();
          _g.moveTo(this.particles[i].position.x * retina, this.particles[i].position.y * retina);
          _g.lineTo(this.particles[i + 1].position.x * retina, this.particles[i + 1].position.y * retina);
          _g.lineTo(p1.x * retina, p1.y * retina);
          _g.lineTo(p0.x * retina, p0.y * retina);
          _g.closePath();
          _g.stroke();
          _g.fill();
        }
      }
    }
    this.Side = function(x1, y1, x2, y2, x3, y3) {
      return ((x1 - x2) * (y3 - y2) - (y1 - y2) * (x3 - x2));
    }
  }
  ConfettiRibbon.bounds = new Vector2(0, 0);
  confetti = {};
  confetti.Context = function(id) {
    var i = 0;
    var canvas = document.getElementById(id);
    var canvasParent = canvas.parentNode;
    var canvasWidth = canvasParent.offsetWidth;
    var canvasHeight = canvasParent.offsetHeight;
    canvas.width = canvasWidth * retina;
    canvas.height = canvasHeight * retina;
    var context = canvas.getContext('2d');
    var interval = null;
    var confettiRibbons = new Array();
    ConfettiRibbon.bounds = new Vector2(canvasWidth, canvasHeight);
    for (i = 0; i < confettiRibbonCount; i++) {
      confettiRibbons[i] = new ConfettiRibbon(random() * canvasWidth, -random() * canvasHeight * 2, ribbonPaperCount, ribbonPaperDist, ribbonPaperThick, 45, 1, 0.05);
    }
    var confettiPapers = new Array();
    ConfettiPaper.bounds = new Vector2(canvasWidth, canvasHeight);
    for (i = 0; i < confettiPaperCount; i++) {
      confettiPapers[i] = new ConfettiPaper(random() * canvasWidth, random() * canvasHeight);
    }
    this.resize = function() {
      canvasWidth = canvasParent.offsetWidth;
      canvasHeight = canvasParent.offsetHeight;
      canvas.width = canvasWidth * retina;
      canvas.height = canvasHeight * retina;
      ConfettiPaper.bounds = new Vector2(canvasWidth, canvasHeight);
      ConfettiRibbon.bounds = new Vector2(canvasWidth, canvasHeight);
    }
    this.start = function() {
      this.stop()
      var context = this;
      this.update();
    }
    this.stop = function() {
      cAF(this.interval);
    }
    this.update = function() {
      var i = 0;
      context.clearRect(0, 0, canvas.width, canvas.height);
      for (i = 0; i < confettiPaperCount; i++) {
        confettiPapers[i].Update(duration);
        confettiPapers[i].Draw(context);
      }
      for (i = 0; i < confettiRibbonCount; i++) {
        confettiRibbons[i].Update(duration);
        confettiRibbons[i].Draw(context);
      }
      this.interval = rAF(function() {
        confetti.update();
      });
    }
  };
  var confetti = new confetti.Context('confetti');
  confetti.start();
  window.addEventListener('resize', function(event){
    confetti.resize();
  });
});
