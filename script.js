document.addEventListener('DOMContentLoaded', () => {

    //================================================================
    // OBTENCIÓN DE ELEMENTOS DEL DOM
    //================================================================
    const splashScreen = document.getElementById('splash-screen');
    const continueButton = document.getElementById('continue-button');
    const gameWrapper = document.getElementById('game-wrapper');
    const gameHeader = document.getElementById('game-header');
    
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');

    const player1HealthBar = document.getElementById('player1HealthBar');
    const player2HealthBar = document.getElementById('player2HealthBar');
    const player1PowerBar = document.getElementById('player1PowerBar');
    const player2PowerBar = document.getElementById('player2PowerBar');
    const player1NameDisplay = document.getElementById('player1NameDisplay');
    const player2NameDisplay = document.getElementById('player2NameDisplay');
    
    const startButton = document.getElementById('startButton');
    const restartButton = document.getElementById('restartButton');
    const gameOverModal = document.getElementById('gameOverModal');
    const winnerMessage = document.getElementById('winnerMessage');
    const gameOverMessage = document.getElementById('gameOverMessage');
    const controlsPanel = document.getElementById('controls-panel');

    const characterGrid = document.getElementById('character-grid');
    const p1SelectedCharImg = document.getElementById('p1-selected-char-img');
    const p1SelectedCharName = document.getElementById('p1-selected-char-name');
    const p2SelectedCharImg = document.getElementById('p2-selected-char-img');
    const p2SelectedCharName = document.getElementById('p2-selected-char-name');
    const selectionPrompt = document.getElementById('selection-prompt');

    //================================================================
    // CONSTANTES Y VARIABLES GLOBALES DEL JUEGO
    //================================================================
    const CANVAS_WIDTH = 800;
    const CANVAS_HEIGHT = 400;
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;

    const GRAVITY = 0.7;
    const BASE_PLAYER_SPEED = 4;
    const BASE_JUMP_STRENGTH = 15;
    const MAX_HEALTH = 150;
    const PUNCH_DAMAGE = 10;
    const KICK_DAMAGE = 13;
    const PUNCH_RANGE = 50;
    const KICK_RANGE = 60;
    const ATTACK_ANIMATION_DURATION = 150;
    const ATTACK_LOGIC_DURATION = 200;
    const ATTACK_COOLDOWN = 550;
    const BASE_KNOCKBACK_STRENGTH = 12;
    const HIT_EFFECT_LIFETIME = 30;
    const POWER_GAIN_PER_CLICK = 3;

    const AI_ACTION_INTERVAL = 250;
    const AI_MOVE_CHANCE = 0.7;
    const AI_JUMP_CHANCE = 0.15;
    const AI_ATTACK_CHANCE_IN_RANGE = 0.75;
    const AI_KICK_CHANCE = 0.4;

    const MAX_POWER = 150;
    const POWER_GAIN_PER_HIT = 25;
    const SUPER_PUNCH_DAMAGE = 30;
    const SUPER_KICK_DAMAGE = 35;

    const PIRANHA_PROJECTILE_SPEED = 8;
    const PIRANHA_PROJECTILE_LIFESPAN = 60;
    const PIRANHA_PROJECTILE_WIDTH = 30;
    const PIRANHA_PROJECTILE_HEIGHT = 20;
    const PIRANHA_PROJECTILE_DAMAGE = 15;
    const PIRANHA_PROJECTILE_COUNT = 3;

    const MONEY_RAIN_COUNT = 5;
    const MONEY_RAIN_WAD_WIDTH = 30;
    const MONEY_RAIN_WAD_HEIGHT = 20;
    const MONEY_RAIN_DAMAGE = 10;
    const MONEY_RAIN_INITIAL_Y = -MONEY_RAIN_WAD_HEIGHT;
    const COIN_RAIN_DAMAGE = 5;

    const CALCULATOR_PROJECTILE_LIFESPAN = 120;
    const CALCULATOR_PROJECTILE_WIDTH = 40;
    const CALCULATOR_PROJECTILE_HEIGHT = 50;
    const CALCULATOR_PROJECTILE_DAMAGE = 18;
    const CALCULATOR_PROJECTILE_COUNT = 5;
    const CALCULATOR_INITIAL_Y = -CALCULATOR_PROJECTILE_HEIGHT;

    const BOLT_DASH_SPEED = 22.5;
    const BOLT_DASH_COUNT = 5;
    const BOLT_DASH_DAMAGE = 8;

    const ZANJAS_CRACK_DAMAGE = 40;
    const ZANJAS_SWALLOWED_DURATION = 90;
    const ZANJAS_CRACK_WIDTH = 150;
    const ZANJAS_CRACK_MAX_HEIGHT = 80;
    const ZANJAS_CRACK_LIFESPAN = 180;

    const PAPELUCHO_STUN_DURATION = 180;
    const PAPELUCHO_PAPER_COUNT = 20;
    const PAPELUCHO_PAPER_WIDTH = 25;
    const PAPELUCHO_PAPER_HEIGHT = 35;
    const PAPELUCHO_PAPER_DAMAGE = 1;

    const ORSINI_KISS_SPEED = 7;
    const ORSINI_KISS_LIFESPAN = 90;
    const ORSINI_KISS_WIDTH = 30;
    const ORSINI_KISS_HEIGHT = 25;
    const ORSINI_KISS_DAMAGE = 18;
    const ORSINI_KISS_COUNT = 2;

    const JACKSON_INVISIBILITY_DURATION = 120;
    const JACKSON_CONFUSION_DURATION = 120;
    const SMOKE_PARTICLE_COUNT = 30;

    const TIA_COTE_TEDDY_COUNT = 1;
    const TIA_COTE_TEDDY_WIDTH = 120;
    const TIA_COTE_TEDDY_HEIGHT = 150;
    const TIA_COTE_TEDDY_DAMAGE = 30;
    const TIA_COTE_TEDDY_INITIAL_Y = -TIA_COTE_TEDDY_HEIGHT - 50;

    let screenShakeMagnitude = 0;
    let screenShakeTimeLeft = 0;
    let gameActive = false;
    let players = [];
    let activeHitEffects = [];
    const hitWords = ["¡POW!", "¡BAM!", "¡CRASH!", "¡KAPOW!", "¡WHAM!", "¡SLAP!", "¡BOOM!", "¡BANG!", "¡PUFF!", "¡THWACK!"];
    const hitWordColors = ["#FFD700", "#FF4500", "#ADFF2F", "#00FFFF", "#FF69B4", "#FFFF00", "#FF1493"];
    let backgroundMusic;
    
    const characterBackgrounds = {
        "El Zanjas": ["img/lazanja.png"],
        "Tía Cote": ["img/glitter.png"],
        "Escape Room Jackson": ["img/happyhour.png"],
        "Piraña": ["img/lamoneda.png"],
        "La Ex": ["img/lamoneda.png"],
        "Matthei Bolt": ["img/pasillomoneda.png"],
        "Burric": ["img/pasillomoneda.png"],
        "Orsini Love": ["img/pasillomoneda.png"],
        "Carolina Papelucho": ["img/pasillomoneda.png"]
    };

    const characterAssets = [
        { name: "Piraña", baseColor: '#e0e0e0', previewImage: "img/personaje1-cabeza.png", textures: { head: "img/personaje1-cabeza.png", torso: "img/personaje1-torso.png", upperArm: "img/personaje1-brazos.png", foreArm: "img/personaje1-antebrazos.png", thigh: "img/personaje1-muslos.png", lowerLeg: "img/personaje1-piernasbajas.png", glove_r: "img/personaje1-guantes-d.png", glove_l: "img/personaje1-guantes-i.png", glove: null, shoe: "img/personaje1-zapatos.png", superEffectTexture: "img/personaje1-super-effect.png" } },
        { name: "La Ex", baseColor: '#c0392b', previewImage: "img/personaje2-cabeza.png", textures: { head: "img/personaje2-cabeza.png", torso: "img/personaje2-torso.png", upperArm: "img/personaje2-brazos.png", foreArm: "img/personaje2-antebrazos.png", thigh: "img/personaje2-muslos.png", lowerLeg: "img/personaje2-piernasbajas.png", glove_r: "img/personaje2-guantes-d.png", glove_l: "img/personaje2-guantes-i.png", glove: null, shoe: "img/personaje2-zapatos.png", superEffectTexture: "img/personaje2-super-effect.png" } },
        { name: "Burric", baseColor: '#27ae60', previewImage: "img/personaje3-cabeza.png", textures: { head: "img/personaje3-cabeza.png", torso: "img/personaje3-torso.png", upperArm: "img/personaje3-brazos.png", foreArm: "img/personaje3-antebrazos.png", thigh: "img/personaje3-muslos.png", lowerLeg: "img/personaje3-piernasbajas.png", glove_r: "img/personaje3-guantes-d.png", glove_l: "img/personaje3-guantes-i.png", glove: null, shoe: "img/personaje3-zapatos.png", superEffectTexture: "img/personaje3-super-effect.png" } },
        { name: "Matthei Bolt", baseColor: '#f39c12', previewImage: "img/personaje4-cabeza.png", textures: { head: "img/personaje4-cabeza.png", torso: "img/personaje4-torso.png", upperArm: "img/personaje4-brazos.png", foreArm: "img/personaje4-antebrazos.png", thigh: "img/personaje4-muslos.png", lowerLeg: "img/personaje4-piernasbajas.png", glove_r: "img/personaje4-guantes-d.png", glove_l: "img/personaje4-guantes-i.png", glove: null, shoe: "img/personaje4-zapatos.png", superEffectTexture: "img/personaje4-super-effect.png", yellowVest: "img/matthei-chaleco.png" } },
        { name: "Carolina Papelucho", baseColor: '#d35400', previewImage: "img/personaje5-cabeza.png", textures: { head: "img/personaje5-cabeza.png", torso: "img/personaje5-torso.png", upperArm: "img/personaje5-brazos.png", foreArm: "img/personaje5-antebrazos.png", thigh: "img/personaje5-muslos.png", lowerLeg: "img/personaje5-piernasbajas.png", glove_r: "img/personaje5-guantes-d.png", glove_l: "img/personaje5-guantes-i.png", glove: null, shoe: "img/personaje5-zapatos.png", superEffectTexture: "img/personaje5-super-effect.png" } },
        { name: "El Zanjas", baseColor: '#7f8c8d', previewImage: "img/personaje6-cabeza.png", textures: { head: "img/personaje6-cabeza.png", torso: "img/personaje6-torso.png", upperArm: "img/personaje6-brazos.png", foreArm: "img/personaje6-antebrazos.png", thigh: "img/personaje6-muslos.png", lowerLeg: "img/personaje6-piernasbajas.png", glove_r: "img/personaje6-guantes-d.png", glove_l: "img/personaje6-guantes-i.png", glove: null, shoe: "img/personaje6-zapatos.png", superEffectTexture: "img/personaje6-super-effect.png" } },
        { name: "Orsini Love", baseColor: '#ff69b4', previewImage: "img/personaje7-cabeza.png", textures: { head: "img/personaje7-cabeza.png", torso: "img/personaje7-torso.png", upperArm: "img/personaje7-brazos.png", foreArm: "img/personaje7-antebrazos.png", thigh: "img/personaje7-muslos.png", lowerLeg: "img/personaje7-piernasbajas.png", glove_r: "img/personaje7-guantes-d.png", glove_l: "img/personaje7-guantes-i.png", glove: null, shoe: "img/personaje7-zapatos.png", superEffectTexture: "img/personaje7-super-effect.png" } },
        { name: "Escape Room Jackson", baseColor: '#6c757d', previewImage: "img/personaje8-cabeza.png", textures: { head: "img/personaje8-cabeza.png", torso: "img/personaje8-torso.png", upperArm: "img/personaje8-brazos.png", foreArm: "img/personaje8-antebrazos.png", thigh: "img/personaje8-muslos.png", lowerLeg: "img/personaje8-piernasbajas.png", glove_r: "img/personaje8-guantes-d.png", glove_l: "img/personaje8-guantes-i.png", glove: null, shoe: "img/personaje8-zapatos.png", superEffectTexture: "img/personaje8-super-effect.png" } },
        { name: "Tía Cote", baseColor: '#9b59b6', previewImage: "img/personaje9-cabeza.png", textures: { head: "img/personaje9-cabeza.png", torso: "img/personaje9-torso.png", upperArm: "img/personaje9-brazos.png", foreArm: "img/personaje9-antebrazos.png", thigh: "img/personaje9-muslos.png", lowerLeg: "img/personaje9-piernasbajas.png", glove_r: "img/personaje9-guantes-d.png", glove_l: "img/personaje9-guantes-i.png", glove: null, shoe: "img/personaje9-zapatos.png", superEffectTexture: "img/personaje9-super-effect.png" } }
    ];

    const bodyTypeStats = { normal: { width: 50, height: 100, speedMod: 1.0, damageMod: 1.0, rangeMod: 1.0, healthMod: 1.0 } };
    const ARM_GUARD_UPPER_ANGLE = Math.PI / 4.2;
    const ARM_GUARD_FOREARM_BEND = -Math.PI / 1.6;
    const ARM_PUNCH_UPPER_EXTEND_ANGLE = -Math.PI / 18;
    const ARM_PUNCH_FOREARM_EXTEND_ANGLE = Math.PI / 30;
    const ARM_PUNCH_UPPER_RECOIL_ANGLE = -Math.PI / 3;
    const ARM_PUNCH_FOREARM_RECOIL_ANGLE = Math.PI / 2.2;
    const LEG_ANGLE_RESTING_FRONT = Math.PI / 2 - Math.PI / 20;
    const LEG_ANGLE_RESTING_BACK = Math.PI / 2 + Math.PI / 30;
    const LEG_ANGLE_KICK_STRIKE = -Math.PI / 18;
    const LEG_ANGLE_KICK_SUPPORT = Math.PI / 2 + Math.PI / 6;
    const BOXING_GLOVE_COLOR = '#c00000';
    const DEFAULT_SHOE_COLOR = '#4a5568';
    let playerSelectedCharIndex = -1;
    let pcSelectedCharIndex = -1;
    let smokeParticles = [];

    class Player {
        constructor(x, initialY, characterAsset, isPlayer1 = true, facingRight = true) {
            this.name = characterAsset.name;
            this.x = x;
            this.baseColor = characterAsset.baseColor;
            this.isPlayer1 = isPlayer1;
            this.facingRight = facingRight;
            this.headTextureImage = this.loadTexture(characterAsset.textures.head);
            this.bodyTextureImage = this.loadTexture(characterAsset.textures.torso);
            this.upperArmTextureImage = this.loadTexture(characterAsset.textures.upperArm);
            this.foreArmTextureImage = this.loadTexture(characterAsset.textures.foreArm);
            this.thighTextureImage = this.loadTexture(characterAsset.textures.thigh);
            this.lowerLegTextureImage = this.loadTexture(characterAsset.textures.lowerLeg);
            this.gloveTextureImage_r = this.loadTexture(characterAsset.textures.glove_r);
            this.gloveTextureImage_l = this.loadTexture(characterAsset.textures.glove_l);
            this.gloveTextureImage = this.loadTexture(characterAsset.textures.glove);
            this.shoeTextureImage = this.loadTexture(characterAsset.textures.shoe);
            this.superEffectTextureImage = this.loadTexture(characterAsset.textures.superEffectTexture);
            this.piranhaProjectileTextureImage = this.loadTexture(characterAsset.textures.piranhaProjectileTexture);
            this.moneyWadTextureImage = this.loadTexture(characterAsset.textures.moneyWadTexture);
            this.calculatorProjectileTextureImage = this.loadTexture(characterAsset.textures.calculatorProjectileTexture);
            this.paperProjectileTexture = this.loadTexture(characterAsset.textures.paperProjectileTexture);
            this.yellowVestTextureImage = this.loadTexture(characterAsset.textures.yellowVest);
            this.limbColorFallback = this.baseColor;
            this.setStats();
            this.y = initialY - this.height;
            this.initialX = x;
            this.initialY = initialY;
            this.velocityX = 0;
            this.velocityY = 0;
            this.isJumping = false;
            this.health = MAX_HEALTH * this.healthMod;
            this.maxHealth = MAX_HEALTH * this.healthMod;
            this.power = 0;
            this.maxPower = MAX_POWER;
            this.isSuperCharged = false;
            this.isPerformingSuperAttackAnimation = false;
            this.activePiranhaProjectiles = [];
            this.activeMoneyWads = [];
            this.activeCoins = [];
            this.activeCalculators = [];
            this.activePapers = [];
            this.activeKisses = [];
            this.activeTeddies = [];
            this.isDashing = false;
            this.dashCount = 0;
            this.dashTargetX = 0;
            this.dashDamageApplied = false;
            this.trail = [];
            this.isPunching = false;
            this.isKicking = false;
            this.attackVisualActive = false;
            this.lastAttackTime = 0;
            this.lastAIDecisionTime = 0;
            this.currentAction = null;
            this.attackArm = null;
            this.nextPunchArm = 'right';
            this.isCastingCrack = false;
            this.crackTimer = 0;
            this.crackOpponentHit = false;
            this.crackCenterX = 0;
            this.isSwallowed = false;
            this.swallowedTimer = 0;
            this.isStunned = false;
            this.stunTimer = 0;
            this.isInvisible = false;
            this.invisibilityTimer = 0;
            this.isConfused = false;
            this.confusionTimer = 0;
            this.confusionBlinkTimer = 0;
            this.showBlurred = false;
        }
        loadTexture(src) {
            if (!src) return null;
            const img = new Image();
            img.src = src;
            img.onerror = () => { console.warn('Error loading texture:', src); };
            return img;
        }
        setStats() {
            const stats = bodyTypeStats.normal;
            this.width = stats.width;
            this.height = stats.height;
            this.speed = BASE_PLAYER_SPEED * stats.speedMod;
            this.punchDamage = PUNCH_DAMAGE * stats.damageMod;
            this.kickDamage = KICK_DAMAGE * stats.damageMod;
            this.punchRange = PUNCH_RANGE * stats.rangeMod;
            this.kickRange = KICK_RANGE * stats.rangeMod;
            this.attackCooldown = ATTACK_COOLDOWN;
            this.jumpStrength = BASE_JUMP_STRENGTH;
            this.knockbackStrength = BASE_KNOCKBACK_STRENGTH;
            this.healthMod = stats.healthMod;
            let headSizeRatioFactor = 1.5;
            let torsoHeightRatio = 0.5;
            let torsoWidthRatio = 0.8;
            let armWidthRatio = 0.20;
            let armLengthTotalRatio = 0.85;
            let legSegmentsTotalHeightRatio = 0.26;
            let shoeHeightRatio = 0.22;
            let shoeWidthFactor = 1.6;
            let legWidthRatio = 0.22;
            let gloveSizeFactor = 3.0;
            this.headSize = (this.width * 0.5) * headSizeRatioFactor;
            this.torsoHeight = this.height * torsoHeightRatio;
            this.torsoWidth = this.width * torsoWidthRatio;
            this.armWidth = this.width * armWidthRatio;
            const totalArmLength = this.torsoHeight * armLengthTotalRatio;
            this.upperArmLength = totalArmLength * 0.5;
            this.foreArmLength = totalArmLength * 0.5;
            const totalLegSegmentsCombinedH = this.height * legSegmentsTotalHeightRatio;
            this.thighHeight = totalLegSegmentsCombinedH * 0.5;
            this.lowerLegHeight = totalLegSegmentsCombinedH * 0.5;
            this.legWidth = this.torsoWidth * legWidthRatio;
            this.gloveSize = this.armWidth * gloveSizeFactor;
            this.shoeHeight = this.height * shoeHeightRatio;
            this.shoeWidth = this.legWidth * shoeWidthFactor;
        }
        drawPartWithTexture(partName, destX, destY, destWidth, destHeight, shouldFlipHorizontally = false) {
            let currentTexture = null;
            if (partName === 'head') currentTexture = this.headTextureImage;
            else if (partName === 'torso') currentTexture = this.bodyTextureImage;
            else if (partName === 'arm_upper') currentTexture = this.upperArmTextureImage;
            else if (partName === 'arm_fore') currentTexture = this.foreArmTextureImage;
            else if (partName === 'thigh') currentTexture = this.thighTextureImage;
            else if (partName === 'lower_leg') currentTexture = this.lowerLegTextureImage;
            if (currentTexture && currentTexture.complete && currentTexture.width > 0) {
                ctx.save();
                if (shouldFlipHorizontally) {
                    ctx.translate(destX + destWidth, destY);
                    ctx.scale(-1, 1);
                    ctx.drawImage(currentTexture, 0, 0, currentTexture.width, currentTexture.height, 0, 0, destWidth, destHeight);
                } else {
                    ctx.drawImage(currentTexture, 0, 0, currentTexture.width, currentTexture.height, destX, destY, destWidth, destHeight);
                }
                ctx.restore();
            } else {
                if (partName !== 'shoe') {
                    ctx.fillStyle = 'magenta';
                    ctx.fillRect(destX, destY, destWidth, destHeight);
                }
            }
        }
        drawArm(isPlayerRightArmActual) {
            ctx.save();
            const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
            const torsoTopY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight);
            const baseShoulderY = torsoTopY + this.torsoHeight * 0.25;
            let shoulderXOffset;
            if (this.facingRight) {
                shoulderXOffset = isPlayerRightArmActual ? this.torsoWidth * 0.30 : this.torsoWidth * 0.70;
            } else {
                shoulderXOffset = isPlayerRightArmActual ? this.torsoWidth * 0.70 : this.torsoWidth * 0.30;
            }
            const shoulderX = this.x + (this.width - this.torsoWidth) / 2 + shoulderXOffset;
            const shoulderY = baseShoulderY;
            ctx.translate(shoulderX, shoulderY);
            let finalUpperArmAngle, finalForeArmAngle;
            const isPunchingThisArm = this.isPunching && this.attackVisualActive &&
                                     ((isPlayerRightArmActual && this.attackArm === 'right') || (!isPlayerRightArmActual && this.attackArm === 'left'));
            if (isPunchingThisArm) {
                finalUpperArmAngle = this.facingRight ? ARM_PUNCH_UPPER_EXTEND_ANGLE : Math.PI - ARM_PUNCH_UPPER_EXTEND_ANGLE;
                finalForeArmAngle = this.facingRight ? ARM_PUNCH_FOREARM_EXTEND_ANGLE : -ARM_PUNCH_FOREARM_EXTEND_ANGLE;
            } else if (this.isPunching && this.attackVisualActive) {
                finalUpperArmAngle = this.facingRight ? ARM_PUNCH_UPPER_RECOIL_ANGLE : Math.PI - ARM_PUNCH_UPPER_RECOIL_ANGLE;
                finalForeArmAngle = this.facingRight ? ARM_PUNCH_FOREARM_RECOIL_ANGLE : -ARM_PUNCH_FOREARM_RECOIL_ANGLE;
            } else {
                finalUpperArmAngle = this.facingRight ? ARM_GUARD_UPPER_ANGLE : Math.PI - ARM_GUARD_UPPER_ANGLE;
                finalForeArmAngle = this.facingRight ? ARM_GUARD_FOREARM_BEND : -ARM_GUARD_FOREARM_BEND;
            }
            ctx.save();
            ctx.rotate(finalUpperArmAngle);
            this.drawPartWithTexture('arm_upper', 0, -this.armWidth / 2, this.upperArmLength, this.armWidth, false);
            ctx.translate(this.upperArmLength, 0);
            ctx.rotate(finalForeArmAngle);
            this.drawPartWithTexture('arm_fore', 0, -this.armWidth / 2, this.foreArmLength, this.armWidth, false);
            let directionalGloveTextureToUse = null;
            if (this.facingRight && this.gloveTextureImage_r && this.gloveTextureImage_r.complete && this.gloveTextureImage_r.width > 0) {
                directionalGloveTextureToUse = this.gloveTextureImage_r;
            } else if (!this.facingRight && this.gloveTextureImage_l && this.gloveTextureImage_l.complete && this.gloveTextureImage_l.width > 0) {
                directionalGloveTextureToUse = this.gloveTextureImage_l;
            }
            if (directionalGloveTextureToUse) {
                const gloveDrawX = this.foreArmLength - (this.armWidth * 0.8);
                const gloveDrawY = -this.gloveSize / 2;
                ctx.drawImage(directionalGloveTextureToUse, gloveDrawX, gloveDrawY, this.gloveSize, this.gloveSize);
            } else {
                ctx.fillStyle = BOXING_GLOVE_COLOR;
                ctx.beginPath();
                ctx.arc(this.foreArmLength, 0, this.gloveSize / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
            ctx.restore();
        }
        drawLeg(isFrontLeg) {
            ctx.save();
            const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
            const hipXOffsetFactor = isFrontLeg ? 0.65 : 0.35;
            const hipXOffset = this.facingRight ? this.torsoWidth * hipXOffsetFactor : this.torsoWidth * (1 - hipXOffsetFactor);
            const hipYOffset = this.torsoHeight;
            const hipX = this.x + (this.width - this.torsoWidth) / 2 + hipXOffset;
            const hipY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight) + hipYOffset;
            ctx.translate(hipX, hipY);
            let angle;
            if (this.isKicking && this.attackVisualActive) {
                if (isFrontLeg) {
                    angle = this.facingRight ? LEG_ANGLE_KICK_STRIKE : Math.PI - LEG_ANGLE_KICK_STRIKE;
                } else {
                    angle = this.facingRight ? LEG_ANGLE_KICK_SUPPORT : Math.PI - LEG_ANGLE_KICK_SUPPORT;
                }
            } else {
                if (isFrontLeg) {
                    angle = this.facingRight ? LEG_ANGLE_RESTING_FRONT : Math.PI - LEG_ANGLE_RESTING_FRONT;
                } else {
                    angle = this.facingRight ? LEG_ANGLE_RESTING_BACK : Math.PI - LEG_ANGLE_RESTING_BACK;
                }
            }
            ctx.rotate(angle);
            this.drawPartWithTexture('thigh', 0, -this.legWidth / 2, this.thighHeight, this.legWidth, false);
            ctx.translate(this.thighHeight, 0);
            this.drawPartWithTexture('lower_leg', 0, -this.legWidth / 2, this.lowerLegHeight, this.legWidth, false);
            ctx.translate(this.lowerLegHeight - this.shoeHeight * 0.05, 0);
            if (this.shoeTextureImage && this.shoeTextureImage.complete && this.shoeTextureImage.width > 0) {
                ctx.drawImage(this.shoeTextureImage, -this.shoeWidth / 2, -this.shoeHeight / 2, this.shoeWidth, this.shoeHeight);
            } else {
                ctx.fillStyle = DEFAULT_SHOE_COLOR;
                ctx.fillRect(-this.shoeWidth / 2, -this.shoeHeight / 2, this.shoeWidth, this.shoeHeight);
            }
            ctx.restore();
        }
        drawPiranhaProjectiles() {
            this.activePiranhaProjectiles.forEach(p => {
                ctx.save();
                ctx.translate(p.x, p.y);
                if (!p.direction) {
                    ctx.translate(p.width, 0);
                    ctx.scale(-1, 1);
                }
                ctx.fillStyle = '#95a5a6';
                ctx.beginPath();
                ctx.ellipse(p.width / 2, p.height / 2, p.width / 2, p.height / 2.5, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = '#7f8c8d';
                ctx.beginPath();
                ctx.moveTo(0, p.height / 2);
                ctx.lineTo(-p.width * 0.2, 0);
                ctx.lineTo(-p.width * 0.2, p.height);
                ctx.closePath();
                ctx.fill();
                ctx.fillStyle = 'red';
                ctx.beginPath();
                ctx.arc(p.width * 0.75, p.height * 0.4, 2, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = 'white';
                ctx.beginPath();
                ctx.moveTo(p.width, p.height / 2);
                ctx.lineTo(p.width * 0.8, p.height * 0.7);
                ctx.lineTo(p.width, p.height * 0.9);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            });
        }
        drawMoneyWads() {
            this.activeMoneyWads.forEach(wad => {
                ctx.save();
                ctx.translate(wad.x + wad.width / 2, wad.y + wad.height / 2);
                ctx.rotate(wad.rotation);
                if (this.moneyWadTextureImage && this.moneyWadTextureImage.complete) {
                    ctx.drawImage(this.moneyWadTextureImage, -wad.width / 2, -wad.height / 2, wad.width, wad.height);
                } else {
                    ctx.fillStyle = '#22c55e';
                    ctx.fillRect(-wad.width / 2, -wad.height / 2, wad.width, wad.height);
                    ctx.fillStyle = '#facc15';
                    ctx.font = `bold ${wad.height*0.8}px Arial`;
                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillText('$', 0, 0);
                }
                ctx.restore();
            });
        }
        drawCoins() {
            this.activeCoins.forEach(coin => {
                ctx.save();
                ctx.translate(coin.x, coin.y);
                ctx.fillStyle = '#facc15';
                ctx.beginPath();
                ctx.arc(0, 0, coin.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.strokeStyle = '#eab308';
                ctx.lineWidth = 2;
                ctx.stroke();
                ctx.restore();
            });
        }
        drawCalculatorProjectiles() {
            this.activeCalculators.forEach(calc => {
                ctx.save();
                ctx.translate(calc.x + calc.width / 2, calc.y + calc.height / 2);
                ctx.rotate(calc.rotation);
                if (this.calculatorProjectileTextureImage && this.calculatorProjectileTextureImage.complete) {
                    ctx.drawImage(this.calculatorProjectileTextureImage, -calc.width / 2, -calc.height / 2, calc.width, calc.height);
                } else {
                    const w = calc.width; const h = calc.height; const depth = 8;
                    ctx.lineWidth = 2; ctx.strokeStyle = '#2c3e50';
                    ctx.fillStyle = '#7f8c8d';
                    ctx.beginPath(); ctx.moveTo(-w / 2, -h / 2); ctx.lineTo(-w / 2 + depth, -h / 2 - depth); ctx.lineTo(w / 2 + depth, -h / 2 - depth); ctx.lineTo(w / 2, -h / 2); ctx.closePath(); ctx.fill(); ctx.stroke();
                    ctx.beginPath(); ctx.moveTo(w / 2, -h / 2); ctx.lineTo(w / 2 + depth, -h / 2 - depth); ctx.lineTo(w / 2 + depth, h / 2 - depth); ctx.lineTo(w / 2, h / 2); ctx.closePath(); ctx.fill(); ctx.stroke();
                    ctx.fillStyle = '#bdc3c7'; ctx.fillRect(-w / 2, -h / 2, w, h); ctx.strokeRect(-w / 2, -h / 2, w, h);
                    ctx.fillStyle = '#2ecc71'; const screenMarginX = w * 0.1; const screenMarginY = h * 0.1; const screenHeight = h * 0.25;
                    ctx.fillRect(-w / 2 + screenMarginX, -h / 2 + screenMarginY, w - screenMarginX * 2, screenHeight); ctx.strokeRect(-w / 2 + screenMarginX, -h / 2 + screenMarginY, w - screenMarginX * 2, screenHeight);
                }
                ctx.restore();
            });
        }
        drawPapers() {
            this.activePapers.forEach(paper => {
                ctx.save();
                ctx.translate(paper.x + paper.width / 2, paper.y + paper.height / 2);
                ctx.rotate(paper.rotation);
                if (paper.isPowerPoint) {
                    const w = paper.width * 1.5; const h = paper.height * 1.5;
                    ctx.fillStyle = '#D04423'; ctx.fillRect(-w / 2, -h / 2, w, h);
                    ctx.fillStyle = 'white'; ctx.beginPath(); ctx.arc(0, 0, w * 0.35, 0, Math.PI * 2); ctx.fill();
                    ctx.fillStyle = '#D04423'; ctx.font = `bold ${h*0.5}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('P', 0, h * 0.05);
                } else {
                    ctx.fillStyle = 'white'; ctx.fillRect(-paper.width / 2, -paper.height / 2, paper.width, paper.height);
                    ctx.strokeStyle = '#cccccc'; ctx.lineWidth = 1;
                    for (let i = 1; i < 5; i++) { const lineY = -paper.height / 2 + (paper.height / 5) * i; ctx.beginPath(); ctx.moveTo(-paper.width / 2, lineY); ctx.lineTo(paper.width / 2, lineY); ctx.stroke(); }
                }
                ctx.restore();
            });
        }
        drawKisses() {
            this.activeKisses.forEach(kiss => {
                ctx.save();
                ctx.translate(kiss.x, kiss.y);
                const w = kiss.width; const h = kiss.height; const pixelSize = w / 11;
                const lipMap = [ "   xxx   ", "  xxxxx  ", " xxxxxxx ", "xxxxxxxxx", "xxxxxxxxx", " xxxxxxx ", "  xxxxx  ", "   xxx   " ];
                ctx.fillStyle = '#ef233c';
                for(let r = 0; r < lipMap.length; r++) { for (let c = 0; c < lipMap[r].length; c++) { if(lipMap[r][c] === 'x') { ctx.fillRect(c * pixelSize, r * pixelSize, pixelSize, pixelSize); } } }
                ctx.fillStyle = '#8d0801'; const lineY = 4 * pixelSize; ctx.fillRect(0, lineY, w, pixelSize);
                ctx.restore();
            });
        }
        drawTeddies() {
            this.activeTeddies.forEach(teddy => {
                ctx.save();
                ctx.translate(teddy.x + teddy.width / 2, teddy.y + teddy.height / 2);
                ctx.rotate(teddy.rotation);
                const w = teddy.width; const h = teddy.height;
                ctx.fillStyle = '#ffc0cb'; ctx.strokeStyle = '#e75480'; ctx.lineWidth = 3;
                ctx.beginPath(); ctx.ellipse(0, h * 0.1, w * 0.35, h * 0.4, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.arc(0, -h * 0.25, w * 0.25, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                const earWidth = w * 0.12; const earHeight = h * 0.35;
                ctx.beginPath(); ctx.ellipse(-w * 0.2, -h * 0.5, earWidth, earHeight, -0.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                ctx.beginPath(); ctx.ellipse(w * 0.2, -h * 0.5, earWidth, earHeight, 0.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                ctx.fillStyle = '#ffdae0'; ctx.beginPath(); ctx.ellipse(0, -h * 0.2, w * 0.12, w * 0.1, 0, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
                ctx.fillStyle = 'black';
                ctx.beginPath(); ctx.arc(-w * 0.08, -h * 0.25, w * 0.04, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.arc(w * 0.08, -h * 0.25, w * 0.04, 0, Math.PI * 2); ctx.fill();
                ctx.beginPath(); ctx.moveTo(0, -h * 0.22); ctx.lineTo(-w * 0.04, -h * 0.18); ctx.lineTo(w * 0.04, -h * 0.18); ctx.closePath(); ctx.fill();
                ctx.restore();
            });
        }
        drawZanjasCrack() {
            if (!this.isCastingCrack) return;
            const groundY = CANVAS_HEIGHT - 10; const halfLife = ZANJAS_CRACK_LIFESPAN / 2;
            let progress = 0;
            if (this.crackTimer > halfLife) { progress = (ZANJAS_CRACK_LIFESPAN - this.crackTimer) / halfLife; } else { progress = this.crackTimer / halfLife; }
            const currentCrackWidth = ZANJAS_CRACK_WIDTH * progress; const currentCrackDepth = ZANJAS_CRACK_MAX_HEIGHT * progress;
            if (currentCrackWidth <= 2) return;
            ctx.save();
            ctx.fillStyle = 'black';
            ctx.beginPath(); ctx.moveTo(this.crackCenterX - currentCrackWidth / 2, groundY); ctx.lineTo(this.crackCenterX + currentCrackWidth / 2, groundY); ctx.lineTo(this.crackCenterX, groundY + currentCrackDepth); ctx.closePath(); ctx.fill();
            ctx.strokeStyle = '#4a2a0a'; ctx.lineWidth = 3;
            for (let s = -1; s <= 1; s += 2) {
                ctx.beginPath(); ctx.moveTo(this.crackCenterX + (s * currentCrackWidth / 2), groundY);
                for (let i = 0; i <= 10; i++) { ctx.lineTo(this.crackCenterX + (s * (currentCrackWidth / 2) * (1 - p)), groundY + (Math.random() - 0.5) * 8 * progress); }
                ctx.stroke();
            }
            ctx.restore();
        }
        draw() {
            if(this.isInvisible) return;
            ctx.save();
            if (this.isDashing) { this.trail.forEach((pos, index) => { ctx.globalAlpha = (index / this.trail.length) * 0.5; this.drawPlayerModel(pos.x, pos.y); }); ctx.globalAlpha = 1; }
            this.drawPlayerModel(this.x, this.y);
            this.drawPiranhaProjectiles(); this.drawMoneyWads(); this.drawCoins(); this.drawCalculatorProjectiles(); this.drawPapers(); this.drawKisses(); this.drawTeddies();
            if (this.isCastingCrack) { this.drawZanjasCrack(); }
            if (this.isConfused) { ctx.font = `bold 24px 'Comic Sans MS'`; ctx.fillStyle = 'yellow'; ctx.textAlign = 'center'; ctx.fillText('???', this.x + this.width / 2, this.y - 20);
            } else if (this.isStunned) { ctx.font = `bold 24px 'Comic Sans MS'`; ctx.fillStyle = 'white'; ctx.textAlign = 'center'; ctx.fillText('!!!', this.x + this.width / 2, this.y - 20); }
            if (this.isPerformingSuperAttackAnimation && this.attackVisualActive && this.superEffectTextureImage && this.superEffectTextureImage.complete && this.name !== "Piraña") { const effectWidth = this.width * 1.5; const effectHeight = this.height * 1.5; const effectX = this.x + (this.width - effectWidth) / 2; const effectY = this.y + (this.height - effectHeight) / 2; ctx.globalAlpha = 0.7; ctx.drawImage(this.superEffectTextureImage, effectX, effectY, effectWidth, effectHeight); ctx.globalAlpha = 1.0; }
            ctx.restore();
        }
        drawPlayerModel(x, y) {
            if (this.isSwallowed) { return; }
            const originalX = this.x; const originalY = this.y;
            this.x = x; this.y = y;
            if (this.showBlurred) { ctx.filter = 'blur(4px)'; } else if (this.isPerformingSuperAttackAnimation && this.attackVisualActive) { ctx.filter = 'brightness(1.75) saturate(2.5)'; }
            const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
            const torsoGlobalY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight);
            const torsoGlobalX = this.x + (this.width - this.torsoWidth) / 2;
            const headGlobalX = this.x + (this.width - this.headSize) / 2;
            const headGlobalY = torsoGlobalY - this.headSize;
            const visuallyBackLegIsFront = !this.facingRight;
            this.drawLeg(visuallyBackLegIsFront);
            this.drawLeg(!visuallyBackLegIsFront);
            if (this.facingRight) {
                this.drawArm(false);
                this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
                if (this.name === 'Matthei Bolt' && this.isDashing) { this.drawVest(torsoGlobalX, torsoGlobalY); }
                this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
                this.drawArm(true);
            } else {
                this.drawArm(true);
                this.drawPartWithTexture('torso', torsoGlobalX, torsoGlobalY, this.torsoWidth, this.torsoHeight, !this.facingRight);
                if (this.name === 'Matthei Bolt' && this.isDashing) { this.drawVest(torsoGlobalX, torsoGlobalY); }
                this.drawPartWithTexture('head', headGlobalX, headGlobalY, this.headSize, this.headSize, !this.facingRight);
                this.drawArm(false);
            }
            ctx.filter = 'none';
            this.x = originalX;
            this.y = originalY;
        }
        drawVest(torsoX, torsoY) {
            ctx.save();
            if (!this.facingRight) { ctx.translate(this.x + this.width/2, 0); ctx.scale(-1,1); ctx.translate(-(this.x + this.width/2), 0); }
            if (this.yellowVestTextureImage && this.yellowVestTextureImage.complete && this.yellowVestTextureImage.width > 0) {
                    ctx.drawImage(this.yellowVestTextureImage, torsoX, torsoY, this.torsoWidth, this.torsoHeight);
            } else {
                ctx.fillStyle = '#eab308'; ctx.fillRect(torsoX, torsoY, this.torsoWidth, this.torsoHeight);
            }
            ctx.restore();
        }
        updateAI() {
            if (this.isConfused) {
                this.confusionTimer--; this.confusionBlinkTimer--;
                if(this.confusionTimer <= 0) { this.isConfused = false; this.showBlurred = false; }
                if(this.confusionBlinkTimer <= 0) { this.showBlurred = !this.showBlurred; this.confusionBlinkTimer = 15; new Audio('audio/pouf-bomb.wav').play().catch(e => console.error("Error playing sound:", e)); }
                return;
             }
            if (this.isDashing || this.isSwallowed || this.isCastingCrack || this.isStunned) { return; }
            if (Date.now() - this.lastAIDecisionTime > AI_ACTION_INTERVAL) {
                this.lastAIDecisionTime = Date.now();
                const opponent = players.find(p => p !== this);
                if (!opponent || opponent.isInvisible) { this.currentAction = 'stand'; return; }
                const distanceToOpponent = Math.abs((this.x + this.width / 2) - (opponent.x + opponent.width / 2)) - (this.width/2 + opponent.width/2);
                const opponentIsToTheRight = (opponent.x + opponent.width / 2) > (this.x + this.width / 2);
                if (distanceToOpponent < Math.max(this.punchRange, this.kickRange) * 1.5) { this.facingRight = opponentIsToTheRight; }
                const canAttack = !(this.isPunching || this.isKicking) && (Date.now() - this.lastAttackTime > this.attackCooldown);
                let decidedToAttack = false; let attackType = 'punch';
                if (this.facingRight === opponentIsToTheRight) {
                    if (distanceToOpponent < this.kickRange && Math.random() < AI_ATTACK_CHANCE_IN_RANGE) {
                        decidedToAttack = true;
                        if (Math.random() < AI_KICK_CHANCE) { attackType = 'kick'; } else if (distanceToOpponent >= this.punchRange) { attackType = 'kick'; } else { attackType = 'punch'; }
                    } else if (distanceToOpponent < this.punchRange && Math.random() < AI_ATTACK_CHANCE_IN_RANGE) { decidedToAttack = true; attackType = 'punch'; }
                }
                if (canAttack && decidedToAttack) {
                    if (this.isSuperCharged && Math.random() < 0.8) { if (attackType === 'kick') this.kick(); else this.punch(); } else if (attackType === 'kick') { this.kick(); } else { this.punch(); }
                    this.currentAction = 'attack';
                } else {
                    if (Math.random() < AI_MOVE_CHANCE) {
                        if (distanceToOpponent > this.punchRange * 0.5) { this.currentAction = opponentIsToTheRight ? 'moveRight' : 'moveLeft'; this.facingRight = opponentIsToTheRight; } else if (Math.random() < 0.3) { this.currentAction = opponentIsToTheRight ? 'moveLeft' : 'moveRight'; } else { this.currentAction = 'stand'; }
                        if (Math.random() < AI_JUMP_CHANCE && !this.isJumping) this.jump();
                    } else { this.currentAction = 'stand'; }
                }
            }
            this.velocityX = 0;
            if (this.currentAction === 'moveLeft') this.velocityX = -this.speed;
            else if (this.currentAction === 'moveRight') this.velocityX = this.speed;
        }
        updatePiranhaProjectiles(opponent) {
            for (let i = this.activePiranhaProjectiles.length - 1; i >= 0; i--) {
                const p = this.activePiranhaProjectiles[i];
                p.x += p.velocityX * (p.direction ? 1 : -1);
                p.lifespan--;
                if (p.lifespan <= 0 || p.x > CANVAS_WIDTH || p.x + p.width < 0) { this.activePiranhaProjectiles.splice(i, 1); continue; }
                const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
                const projectileBox = { x: p.x, y: p.y, width: p.width, height: p.height };
                if ( !opponent.isSwallowed && !opponent.isStunned && projectileBox.x < opponentBox.x + opponentBox.width && projectileBox.x + projectileBox.width > opponentBox.x && projectileBox.y < opponentBox.y + opponentBox.height && projectileBox.y + projectileBox.height > opponentBox.y ) {
                    opponent.takeDamage(p.damage, p.direction);
                    activeHitEffects.push({ text: "¡ÑAM!", x: p.x, y: p.y, color: "#ff6347", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME / 2 });
                    this.activePiranhaProjectiles.splice(i, 1);
                }
            }
        }
        updateMoneyWads(opponent) {
            for (let i = this.activeMoneyWads.length - 1; i >= 0; i--) {
                const wad = this.activeMoneyWads[i];
                wad.velocityY += GRAVITY * 0.5; wad.y += wad.velocityY; wad.x += wad.velocityX; wad.rotation += wad.rotationSpeed;
                if (wad.y > CANVAS_HEIGHT) { this.activeMoneyWads.splice(i, 1); continue; }
                const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
                const wadBox = { x: wad.x, y: wad.y, width: wad.width, height: wad.height };
                if ( !opponent.isSwallowed && !opponent.isStunned && wadBox.x < opponentBox.x + opponentBox.width && wadBox.x + wadBox.width > opponentBox.x && wadBox.y < opponentBox.y + opponentBox.height && wadBox.y + wadBox.height > opponentBox.y ) {
                    opponent.takeDamage(wad.damage, wad.x > opponent.x + opponent.width / 2);
                    activeHitEffects.push({ text: "$$$", x: wad.x, y: wad.y, color: "#22c55e", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                    this.activeMoneyWads.splice(i, 1);
                }
            }
        }
        updateCoins(opponent) {
            for (let i = this.activeCoins.length - 1; i >= 0; i--) {
                const coin = this.activeCoins[i];
                coin.velocityY += GRAVITY * 0.6; coin.y += coin.velocityY;
                if (coin.y > CANVAS_HEIGHT) { this.activeCoins.splice(i, 1); continue; }
                const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
                const coinBox = { x: coin.x - coin.radius, y: coin.y - coin.radius, width: coin.radius * 2, height: coin.radius * 2 };
                if ( !opponent.isSwallowed && !opponent.isStunned && coinBox.x < opponentBox.x + opponentBox.width && coinBox.x + coinBox.width > opponentBox.x && coinBox.y < opponentBox.y + opponentBox.height && coinBox.y + coinBox.height > opponentBox.y ) {
                    opponent.takeDamage(coin.damage, coin.x > opponent.x + opponent.width / 2);
                    activeHitEffects.push({ text: "$", x: coin.x, y: coin.y, color: "#facc15", alpha: 1.0, size: 20, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                    this.activeCoins.splice(i, 1);
                }
            }
        }
        updateCalculatorProjectiles(opponent) {
            for (let i = this.activeCalculators.length - 1; i >= 0; i--) {
                const calc = this.activeCalculators[i];
                calc.x += calc.velocityX; calc.y += calc.velocityY; calc.velocityY += GRAVITY * 0.4; calc.rotation += calc.rotationSpeed; calc.lifespan--;
                if (calc.lifespan <= 0 || calc.y > CANVAS_HEIGHT) { this.activeCalculators.splice(i, 1); continue; }
                const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
                const calcBox = { x: calc.x, y: calc.y, width: calc.width, height: calc.height };
                if ( !opponent.isSwallowed && !opponent.isStunned && calcBox.x < opponentBox.x + opponentBox.width && calcBox.x + calcBox.width > opponentBox.x && calcBox.y < opponentBox.y + opponentBox.height && calcBox.y + calcBox.height > opponentBox.y ) {
                    opponent.takeDamage(calc.damage, calc.velocityX > 0);
                    activeHitEffects.push({ text: "ERROR", x: calc.x, y: calc.y, color: "#e53e3e", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                    this.activeCalculators.splice(i, 1);
                }
            }
        }
        updatePapers(opponent) {
            for (let i = this.activePapers.length - 1; i >= 0; i--) {
                const paper = this.activePapers[i];
                paper.velocityY += GRAVITY * 0.3; paper.y += paper.velocityY; paper.x += paper.velocityX; paper.rotation += paper.rotationSpeed;
                if (paper.y > CANVAS_HEIGHT) { this.activePapers.splice(i, 1); continue; }
                const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
                const paperBox = { x: paper.x, y: paper.y, width: paper.width, height: paper.height };
                if ( !opponent.isSwallowed && !opponent.isStunned && paperBox.x < opponentBox.x + opponentBox.width && paperBox.x + paperBox.width > opponentBox.x && paperBox.y < opponentBox.y + opponentBox.height && paperBox.y + paperBox.height > opponentBox.y ) {
                    opponent.takeDamage(PAPELUCHO_PAPER_DAMAGE, this.facingRight);
                    opponent.isStunned = true;
                    opponent.stunTimer = PAPELUCHO_STUN_DURATION;
                    this.activePapers.splice(i, 1);
                }
            }
        }
        updateKisses(opponent) {
            for (let i = this.activeKisses.length - 1; i >= 0; i--) {
                const kiss = this.activeKisses[i];
                kiss.x += kiss.velocityX * (kiss.direction ? 1 : -1); kiss.lifespan--;
                if (kiss.lifespan <= 0 || kiss.x > CANVAS_WIDTH || kiss.x + kiss.width < 0) { this.activeKisses.splice(i, 1); continue; }
                const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
                const kissBox = { x: kiss.x, y: kiss.y, width: kiss.width, height: kiss.height };
                if ( !opponent.isSwallowed && !opponent.isStunned && kissBox.x < opponentBox.x + opponentBox.width && kissBox.x + kissBox.width > opponentBox.x && kissBox.y < opponentBox.y + opponentBox.height && kissBox.y + kissBox.height > opponentBox.y ) {
                    opponent.takeDamage(kiss.damage, kiss.direction);
                    activeHitEffects.push({ text: "♥", x: kiss.x, y: kiss.y, color: "#ff69b4", alpha: 1.0, size: 30, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                    this.activeKisses.splice(i, 1);
                }
            }
        }
         updateTeddies(opponent) {
            for (let i = this.activeTeddies.length - 1; i >= 0; i--) {
                const teddy = this.activeTeddies[i];
                teddy.velocityY += GRAVITY; teddy.y += teddy.velocityY; teddy.rotation += teddy.rotationSpeed;
                if (teddy.y > CANVAS_HEIGHT) { this.activeTeddies.splice(i, 1); continue; }
                const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
                const teddyBox = { x: teddy.x, y: teddy.y, width: teddy.width, height: teddy.height };
                if ( !opponent.isSwallowed && !opponent.isStunned && teddyBox.x < opponentBox.x + opponentBox.width && teddyBox.x + teddyBox.width > opponentBox.x && teddyBox.y < opponentBox.y + opponentBox.height && teddyBox.y + teddyBox.height > opponentBox.y ) {
                    opponent.takeDamage(teddy.damage, this.facingRight);
                    activeHitEffects.push({ text: "¡AWW!", x: teddy.x, y: teddy.y, color: "#9b59b6", alpha: 1.0, size: 40, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
                    this.activeTeddies.splice(i, 1);
                }
            }
        }
        updateBoltDash(opponent) {
            if (!this.isDashing) return;
            const moveDirection = Math.sign(this.dashTargetX - this.x);
            this.x += moveDirection * BOLT_DASH_SPEED; this.facingRight = moveDirection > 0;
            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            const selfBox = { x: this.x, y: this.y, width: this.width, height: this.height };
            if ( !this.dashDamageApplied && !opponent.isSwallowed && !opponent.isStunned && selfBox.x < opponentBox.x + opponentBox.width && selfBox.x + selfBox.width > opponentBox.x && self.y < opponentBox.y + opponentBox.height && self.y + selfBox.height > opponentBox.y ) {
                opponent.takeDamage(BOLT_DASH_DAMAGE, moveDirection > 0);
                this.dashDamageApplied = true;
                screenShakeMagnitude = 5; screenShakeTimeLeft = 5;
                activeHitEffects.push({ text: "¡ZAS!", x: opponent.x + opponent.width/2, y: opponent.y + opponent.height/2, color: "#f39c12", alpha: 1.0, size: 25, rotation: 0, lifetime: HIT_EFFECT_LIFETIME });
            }
            if (Math.abs(this.x - this.dashTargetX) < BOLT_DASH_SPEED) {
                this.x = this.dashTargetX; this.dashCount--;
                if (this.dashCount <= 0) { this.isDashing = false; this.trail = []; } else { this.dashTargetX = this.dashTargetX === 0 ? CANVAS_WIDTH - this.width : 0; this.dashDamageApplied = false; }
            }
        }
        updateZanjasCrack() {
            if (!this.isCastingCrack) return;
            this.crackTimer--;
            if (this.crackTimer <= 0) { this.isCastingCrack = false; return; }
            const opponent = players.find(p => p !== this);
            if (!opponent || this.crackOpponentHit || opponent.isSwallowed) { return; }
            const crackActiveStart = ZANJAS_CRACK_LIFESPAN * 0.7;
            const crackActiveEnd = ZANJAS_CRACK_LIFESPAN * 0.2;
            if (this.crackTimer < crackActiveStart && this.crackTimer > crackActiveEnd) {
                const opponentCenterX = opponent.x + opponent.width / 2;
                if (Math.abs(opponentCenterX - this.crackCenterX) < ZANJAS_CRACK_WIDTH / 2 && (opponent.y + opponent.height) >= (CANVAS_HEIGHT - 10)) {
                    opponent.takeDamage(ZANJAS_CRACK_DAMAGE, this.facingRight);
                    opponent.isSwallowed = true;
                    opponent.swallowedTimer = ZANJAS_SWALLOWED_DURATION;
                    this.crackOpponentHit = true;
                    activeHitEffects.push({ text: "¡TRAGADO!", x: opponent.x + opponent.width / 2, y: opponent.y + opponent.height / 2, color: "#8B4513", alpha: 1.0, size: 40, rotation: (Math.random() - 0.5) * 0.3, lifetime: HIT_EFFECT_LIFETIME * 2 });
                    screenShakeMagnitude = 20; screenShakeTimeLeft = 30;
                }
            }
        }
        update() {
            if (this.isSwallowed) { this.swallowedTimer--; if (this.swallowedTimer <= 0) { this.isSwallowed = false; this.x = Math.random() * (CANVAS_WIDTH - this.width); this.y = -this.height; this.velocityY = 0; } return; }
            if (this.isStunned) { this.stunTimer--; if (this.stunTimer <= 0) { this.isStunned = false; } return; }
            if (!this.isPlayer1) { this.updateAI(); }
            if (this.isInvisible) { this.invisibilityTimer--; if (this.invisibilityTimer <= 0) { this.isInvisible = false; const opponent = players.find(p => p !== this); if (opponent) { this.x = opponent.x + (opponent.facingRight ? opponent.width + 20 : -this.width - 20); this.y = opponent.y; if (this.x < 0) this.x = 10; if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width - 10; } } return; }
            if (this.isDashing) { const opponent = players.find(p => p !== this); this.updateBoltDash(opponent); this.trail.push({ x: this.x, y: this.y }); if (this.trail.length > 5) { this.trail.shift(); } return; }
            this.x += this.velocityX; this.velocityY += GRAVITY; this.y += this.velocityY;
            const opponent = players.find(p => p !== this);
            if (opponent) { this.updatePiranhaProjectiles(opponent); this.updateMoneyWads(opponent); this.updateCoins(opponent); this.updateCalculatorProjectiles(opponent); this.updatePapers(opponent); this.updateKisses(opponent); this.updateTeddies(opponent); }
            if (this.isCastingCrack) { this.updateZanjasCrack(); }
            const actualGroundSurfaceY = CANVAS_HEIGHT - 10;
            if (this.y + this.height > actualGroundSurfaceY) { this.y = actualGroundSurfaceY - this.height; this.velocityY = 0; this.isJumping = false; }
            if (this.x < 0) this.x = 0;
            if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width;
        }
        chargePowerOnClick() {
            if (this.isSuperCharged || !gameActive) return;
            if (window.navigator && window.navigator.vibrate) { window.navigator.vibrate(15); }
            const powerBarContainer = document.getElementById('player1PowerBarContainer');
            powerBarContainer.classList.remove('power-bar-container-flash'); void powerBarContainer.offsetWidth; powerBarContainer.classList.add('power-bar-container-flash');
            setTimeout(() => { powerBarContainer.classList.remove('power-bar-container-flash'); }, 150);
            this.power += POWER_GAIN_PER_CLICK;
            if (this.power >= this.maxPower) { this.power = this.maxPower; this.isSuperCharged = true; }
            updatePowerBars();
        }
        jump() { if (!this.isJumping) { this.velocityY = -this.jumpStrength; this.isJumping = true; } }
        gainPower(amount) {
            if (this.isSuperCharged) return;
            this.power += amount;
            if (this.power >= this.maxPower) { this.power = this.maxPower; this.isSuperCharged = true; }
            updatePowerBars();
        }
        launchPiranhaProjectiles() {
            const numPiranhas = PIRANHA_PROJECTILE_COUNT;
            const piranhaDamage = PIRANHA_PROJECTILE_DAMAGE;
            let handX, handY;
            const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
            const shoulderX = this.x + (this.width - this.torsoWidth) / 2 + (this.facingRight ? this.torsoWidth * 0.70 : this.torsoWidth * 0.30);
            const shoulderY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight) + this.torsoHeight * 0.20;
            const armAngle = this.facingRight ? ARM_PUNCH_UPPER_EXTEND_ANGLE : Math.PI - ARM_PUNCH_UPPER_EXTEND_ANGLE;
            const forearmAngle = this.facingRight ? ARM_PUNCH_FOREARM_EXTEND_ANGLE : -ARM_PUNCH_FOREARM_EXTEND_ANGLE;
            const elbowX = shoulderX + Math.cos(armAngle) * this.upperArmLength;
            const elbowY = shoulderY + Math.sin(armAngle) * this.upperArmLength;
            handX = elbowX + Math.cos(armAngle + forearmAngle) * (this.foreArmLength + this.gloveSize * 0.25);
            handY = elbowY + Math.sin(armAngle + forearmAngle) * (this.foreArmLength + this.gloveSize * 0.25);
            for (let i = 0; i < numPiranhas; i++) { this.activePiranhaProjectiles.push({ x: handX + (this.facingRight ? this.gloveSize / 2 : -this.gloveSize/2 - PIRANHA_PROJECTILE_WIDTH), y: handY - PIRANHA_PROJECTILE_HEIGHT / 2 + (i * (PIRANHA_PROJECTILE_HEIGHT / 1.5)) - (PIRANHA_PROJECTILE_HEIGHT/3 * (numPiranhas-1)/2) , width: PIRANHA_PROJECTILE_WIDTH, height: PIRANHA_PROJECTILE_HEIGHT, velocityX: PIRANHA_PROJECTILE_SPEED, direction: this.facingRight, lifespan: PIRANHA_PROJECTILE_LIFESPAN, damage: piranhaDamage }); }
        }
        launchMoneyWadAttack() {
            const opponent = players.find(p => p !== this); if (!opponent) return;
            for (let i = 0; i < MONEY_RAIN_COUNT; i++) { const clusterCenterX = opponent.x + opponent.width / 2 + (Math.random() - 0.5) * opponent.width; const clusterStartY = MONEY_RAIN_INITIAL_Y - (Math.random() * CANVAS_HEIGHT / 2);
                for (let j = 0; j < 3; j++) { this.activeMoneyWads.push({ x: clusterCenterX + (Math.random() - 0.5) * 40, y: clusterStartY + (Math.random() - 0.5) * 40, width: MONEY_RAIN_WAD_WIDTH, height: MONEY_RAIN_WAD_HEIGHT, velocityX: (Math.random() - 0.5) * 2, velocityY: Math.random() * 4 + 3, rotation: (Math.random() - 0.5) * Math.PI, rotationSpeed: (Math.random() - 0.5) * 0.1, damage: MONEY_RAIN_DAMAGE, }); }
                for (let k = 0; k < 5; k++) { this.activeCoins.push({ x: clusterCenterX + (Math.random() - 0.5) * 60, y: clusterStartY + (Math.random() - 0.5) * 60, radius: Math.random() * 5 + 5, velocityY: Math.random() * 5 + 4, damage: COIN_RAIN_DAMAGE }); }
            }
        }
        launchCalculatorAttack() {
            const opponent = players.find(p => p !== this); if (!opponent) return;
            for (let i = 0; i < CALCULATOR_PROJECTILE_COUNT; i++) { this.activeCalculators.push({ x: opponent.x + (Math.random() - 0.5) * opponent.width, y: CALCULATOR_INITIAL_Y - (Math.random() * 100), width: CALCULATOR_PROJECTILE_WIDTH, height: CALCULATOR_PROJECTILE_HEIGHT, velocityX: (Math.random() - 0.5) * 2, velocityY: (Math.random() * 2) + 2, rotation: (Math.random() - 0.5) * 2, rotationSpeed: (Math.random() - 0.5) * 0.2, lifespan: CALCULATOR_PROJECTILE_LIFESPAN, damage: CALCULATOR_PROJECTILE_DAMAGE }); }
        }
        launchPapeluchoAttack() {
            const opponent = players.find(p => p !== this); if (!opponent) return;
            for (let i = 0; i < PAPELUCHO_PAPER_COUNT; i++) { const spawnX = opponent.x + (opponent.width / 2) + (Math.random() - 0.5) * (opponent.width * 2.5); this.activePapers.push({ x: spawnX, y: -PAPELUCHO_PAPER_HEIGHT - Math.random() * 300, width: PAPELUCHO_PAPER_HEIGHT, height: PAPELUCHO_PAPER_HEIGHT, velocityX: (Math.random() - 0.5) * 4, velocityY: (Math.random() * 2) + 2, rotation: (Math.random() - 0.5) * 2, rotationSpeed: (Math.random() - 0.5) * 0.2, lifespan: 250, isPowerPoint: i === 0 }); }
        }
        launchOrsiniLoveAttack() {
            let handX, handY;
            const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
            const shoulderX = this.x + (this.width - this.torsoWidth) / 2 + (this.facingRight ? this.torsoWidth * 0.70 : this.torsoWidth * 0.30);
            const shoulderY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight) + this.torsoHeight * 0.20;
            const armAngle = this.facingRight ? ARM_PUNCH_UPPER_EXTEND_ANGLE : Math.PI - ARM_PUNCH_UPPER_EXTEND_ANGLE;
            const forearmAngle = this.facingRight ? ARM_PUNCH_FOREARM_EXTEND_ANGLE : -ARM_PUNCH_FOREARM_EXTEND_ANGLE;
            const elbowX = shoulderX + Math.cos(armAngle) * this.upperArmLength;
            const elbowY = shoulderY + Math.sin(armAngle) * this.upperArmLength;
            handX = elbowX + Math.cos(armAngle + forearmAngle) * (this.foreArmLength + this.gloveSize * 0.25);
            handY = elbowY + Math.sin(armAngle + forearmAngle) * (this.foreArmLength + this.gloveSize * 0.25);
            for (let i = 0; i < ORSINI_KISS_COUNT; i++) { this.activeKisses.push({ x: handX, y: handY, width: ORSINI_KISS_WIDTH, height: ORSINI_KISS_HEIGHT, velocityX: ORSINI_KISS_SPEED + (i * 2), direction: this.facingRight, lifespan: ORSINI_KISS_LIFESPAN, damage: ORSINI_KISS_DAMAGE }); }
        }
        launchEscapeRoomJacksonAttack() {
            const opponent = players.find(p => p !== this); if (!opponent) return;
            this.isInvisible = true; this.invisibilityTimer = JACKSON_INVISIBILITY_DURATION;
            opponent.isConfused = true; opponent.confusionTimer = JACKSON_CONFUSION_DURATION;
            new Audio('audio/smoke-bomb.wav').play().catch(e => console.error("Error playing sound:", e));
            for (let i = 0; i < SMOKE_PARTICLE_COUNT; i++) { smokeParticles.push({ x: this.x + this.width / 2, y: this.y + this.height / 2, radius: Math.random() * 20 + 10, alpha: 1, velocityX: (Math.random() - 0.5) * 4, velocityY: (Math.random() - 0.5) * 4 }); }
            this.x = -1000;
        }
        launchTiaCoteAttack() {
            const opponent = players.find(p => p !== this); if (!opponent) return;
            for (let i = 0; i < TIA_COTE_TEDDY_COUNT; i++) { this.activeTeddies.push({ x: opponent.x + (opponent.width / 2) - (TIA_COTE_TEDDY_WIDTH / 2), y: TIA_COTE_TEDDY_INITIAL_Y - (Math.random() * 50), width: TIA_COTE_TEDDY_WIDTH, height: TIA_COTE_TEDDY_HEIGHT, velocityY: 1.5, rotation: (Math.random() - 0.5) * 0.1, rotationSpeed: (Math.random() - 0.5) * 0.02, damage: TIA_COTE_TEDDY_DAMAGE }); }
        }
        launchBoltDashAttack() { this.isDashing = true; this.dashCount = BOLT_DASH_COUNT; this.dashTargetX = this.x > CANVAS_WIDTH / 2 ? 0 : CANVAS_WIDTH - this.width; this.dashDamageApplied = false; this.velocityY = 0; this.trail = []; }
        launchZanjasAttack() { const opponent = players.find(p => p !== this); if (!opponent) return; this.isCastingCrack = true; this.crackTimer = ZANJAS_CRACK_LIFESPAN; this.crackOpponentHit = false; this.crackCenterX = opponent.x + opponent.width / 2; }
        _performAttack(isKickMove) {
            if (this.isPunching || this.isKicking || (Date.now() - this.lastAttackTime < this.attackCooldown)) return;
            let currentDamage; let currentRange = isKickMove ? this.kickRange : this.punchRange;
            this.isPerformingSuperAttackAnimation = false;
            let isSuperMove = this.isSuperCharged;
            if (isSuperMove) {
                currentDamage = isKickMove ? SUPER_KICK_DAMAGE : SUPER_PUNCH_DAMAGE;
                this.isPerformingSuperAttackAnimation = true;
                if (this.name === "Piraña") { new Audio('audio/hadouken.wav').play().catch(e => console.error("Error al reproducir sonido:", e)); this.launchPiranhaProjectiles(); currentDamage = 0; }
                else if (this.name === "La Ex") { this.launchMoneyWadAttack(); currentDamage = 0; }
                else if (this.name === "Burric") { this.launchCalculatorAttack(); currentDamage = 0; }
                else if (this.name === "Matthei Bolt") { this.launchBoltDashAttack(); currentDamage = 0; }
                else if (this.name === "El Zanjas") { this.launchZanjasAttack(); currentDamage = 0; }
                else if (this.name === "Carolina Papelucho") { this.launchPapeluchoAttack(); currentDamage = 0; }
                else if (this.name === "Orsini Love") { this.launchOrsiniLoveAttack(); currentDamage = 0; }
                else if (this.name === "Escape Room Jackson") { this.launchEscapeRoomJacksonAttack(); currentDamage = 0; }
                else if (this.name === "Tía Cote") { this.launchTiaCoteAttack(); currentDamage = 0; }
                else { new Audio('audio/38H.wav').play().catch(e => console.error("Error playing sound:", e)); }
            } else { currentDamage = isKickMove ? this.kickDamage : this.punchDamage; }
            if (isKickMove) { this.isKicking = true; } else { this.isPunching = true; this.attackArm = this.nextPunchArm; this.nextPunchArm = (this.nextPunchArm === 'right' ? 'left' : 'right'); }
            this.attackVisualActive = true; this.lastAttackTime = Date.now();
            setTimeout(() => { if (isKickMove) this.isKicking = false; else this.isPunching = false; this.attackArm = null; if (isSuperMove) this.isPerformingSuperAttackAnimation = false; }, ATTACK_LOGIC_DURATION);
            setTimeout(() => { this.attackVisualActive = false; }, ATTACK_ANIMATION_DURATION);
            const opponent = players.find(p => p !== this); if (!opponent || opponent.isSwallowed) return;
            let attackHitbox;
            const totalLegSegmentsHeight = this.thighHeight + this.lowerLegHeight;
            if (isKickMove) {
                const angleOfAttack = this.facingRight ? LEG_ANGLE_KICK_STRIKE : Math.PI - LEG_ANGLE_KICK_STRIKE; const limbLength = totalLegSegmentsHeight + this.shoeHeight / 2; const hipY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight) + this.torsoHeight; const kickingLegDrawArg = this.facingRight; const hipXOffsetFactorForKickingLeg = kickingLegDrawArg ? 0.65 : 0.35; const hipX = this.x + (this.width - this.torsoWidth) / 2 + (this.facingRight ? this.torsoWidth * hipXOffsetFactorForKickingLeg : this.torsoWidth * (1 - hipXOffsetFactorForKickingLeg)); const attackEndX = hipX + Math.cos(angleOfAttack) * limbLength * 0.9; const attackEndY = hipY + Math.sin(angleOfAttack) * limbLength * 0.9;
                attackHitbox = { x: attackEndX - currentRange / 2, y: attackEndY - currentRange / 2, width: currentRange, height: currentRange };
            } else {
                let shoulderXOffsetFactor; if (this.facingRight) { shoulderXOffsetFactor = (this.attackArm === 'right') ? 0.30 : 0.70; } else { shoulderXOffsetFactor = (this.attackArm === 'left') ? 0.30 : 0.70; }
                const shoulderX = this.x + (this.width - this.torsoWidth) / 2 + this.torsoWidth * shoulderXOffsetFactor; const shoulderY = this.y + (this.height - this.torsoHeight - totalLegSegmentsHeight - this.shoeHeight) + this.torsoHeight * 0.20; let upperArmHitboxAngle = this.facingRight ? ARM_PUNCH_UPPER_EXTEND_ANGLE : Math.PI - ARM_PUNCH_UPPER_EXTEND_ANGLE; let foreArmHitboxAngle = this.facingRight ? ARM_PUNCH_FOREARM_EXTEND_ANGLE : -ARM_PUNCH_FOREARM_EXTEND_ANGLE; const elbowX = shoulderX + Math.cos(upperArmHitboxAngle) * this.upperArmLength; const elbowY = shoulderY + Math.sin(upperArmHitboxAngle) * this.upperArmLength; const attackEndX = elbowX + Math.cos(upperArmHitboxAngle + foreArmHitboxAngle) * (this.foreArmLength + this.gloveSize * 0.5); const attackEndY = elbowY + Math.sin(upperArmHitboxAngle + foreArmHitboxAngle) * (this.foreArmLength + this.gloveSize * 0.5);
                attackHitbox = { x: attackEndX - currentRange / 2, y: attackEndY - currentRange / 2, width: currentRange, height: currentRange };
            }
            const opponentBox = { x: opponent.x, y: opponent.y, width: opponent.width, height: opponent.height };
            if (!isSuperMove || (isSuperMove && this.name !== "Piraña" && this.name !== "La Ex" && this.name !== "Burric" && this.name !== "Matthei Bolt" && this.name !== "El Zanjas" && this.name !== "Carolina Papelucho" && this.name !== "Orsini Love" && this.name !== "Escape Room Jackson" && this.name !== "Tía Cote")) {
                 if ( attackHitbox.x < opponentBox.x + opponentBox.width && attackHitbox.x + attackHitbox.width > opponentBox.x && attackHitbox.y < opponentBox.y + opponentBox.height && attackHitbox.y + attackHitbox.height > opponentBox.y ) {
                    opponent.takeDamage(currentDamage, this.facingRight);
                    if (!isSuperMove) { this.gainPower(POWER_GAIN_PER_HIT); }
                    else { this.power = 0; this.isSuperCharged = false; updatePowerBars(); activeHitEffects.push({ text: "¡SÚPER!", x: opponent.x + opponent.width / 2, y: opponent.y + opponent.height / 2, color: "#FF00FF", alpha: 1.0, size: 50, rotation: (Math.random() - 0.5) * 0.8, lifetime: HIT_EFFECT_LIFETIME * 3 }); screenShakeMagnitude = 15; screenShakeTimeLeft = 20; }
                } else { if (isSuperMove) { this.power = 0; this.isSuperCharged = false; updatePowerBars(); } }
            } else if (isSuperMove) {
                this.power = 0; this.isSuperCharged = false; updatePowerBars();
                let hitEffectText = ""; let hitEffectColor = "";
                if (this.name === "Piraña") { hitEffectText = "¡PIRAÑAS!"; hitEffectColor = "#00ced1"; }
                else if (this.name === "La Ex") { hitEffectText = "¡Estoy forrada!"; hitEffectColor = "#22c55e"; }
                else if (this.name === "Burric") { hitEffectText = "¡No tengo la cifra exacta!"; hitEffectColor = "#8d99ae"; }
                else if (this.name === "Matthei Bolt") { hitEffectText = "¡A CORRER!"; hitEffectColor = "#f39c12"; }
                else if (this.name === "El Zanjas") { hitEffectText = "¡SuperZanja!"; hitEffectColor = "#8B4513"; }
                else if (this.name === "Carolina Papelucho") { hitEffectText = "Te lo explico en una presentación!"; hitEffectColor = "#ff8c00"; }
                else if (this.name === "Orsini Love") { hitEffectText = "Uno pa' Jackson, uno pa' ti"; hitEffectColor = "#ff69b4"; }
                else if (this.name === "Escape Room Jackson") { hitEffectText = "¡Salida de Emergencia!"; hitEffectColor = "#adb5bd"; }
                else if (this.name === "Tía Cote") { hitEffectText = "¡Cuidado con la ternura!"; hitEffectColor = "#9b59b6"; }
                activeHitEffects.push({ text: hitEffectText, x: this.x + this.width/2, y: this.y, color: hitEffectColor, size: 30, lifetime: HIT_EFFECT_LIFETIME * 1.5, rotation: (Math.random() - 0.5) * 0.2, alpha: 1});
                screenShakeMagnitude = 10; screenShakeTimeLeft = 15;
            }
        }
        punch() { this._performAttack(false); }
        kick() { this._performAttack(true); }
        takeDamage(damage, attackerFacingRight) {
            if(this.isDashing || this.isSwallowed) return;
            this.health -= damage;
            if (this.health < 0) this.health = 0;
            new Audio('audio/2BH.wav').play().catch(e => console.error("Error playing sound:", e));
            if (!this.isSwallowed) { this.x += attackerFacingRight ? this.knockbackStrength : -this.knockbackStrength; if (this.x < 0) this.x = 0; if (this.x + this.width > CANVAS_WIDTH) this.x = CANVAS_WIDTH - this.width; this.velocityY = -this.knockbackStrength / 2; }
            const randomWord = hitWords[Math.floor(Math.random() * hitWords.length)];
            const randomColor = hitWordColors[Math.floor(Math.random() * hitWordColors.length)];
            activeHitEffects.push({ text: randomWord, x: this.x + this.width / 2 + (Math.random() - 0.5) * 20, y: this.y + this.height / 3 + (Math.random() - 0.5) * 20, color: randomColor, alpha: 1.0, size: 24 + Math.random() * 16, rotation: (Math.random() - 0.5) * 0.5, lifetime: HIT_EFFECT_LIFETIME });
            updateHealthBars();
            checkGameOver();
        }
    }

    function createCharacterSelectionUI() {
        characterGrid.innerHTML = '';
        characterAssets.forEach((charAsset, index) => {
            const portraitWrapper = document.createElement('div');
            portraitWrapper.classList.add('character-portrait', 'rounded-lg', 'overflow-hidden', 'p-1');
            portraitWrapper.dataset.charIndex = index;
            const imgEl = document.createElement('img');
            imgEl.src = charAsset.previewImage;
            imgEl.alt = charAsset.name;
            imgEl.onerror = () => { imgEl.src = `https://placehold.co/100x100/2d3748/e0e0e0?text=${charAsset.name.substring(0,3)}`; };
            portraitWrapper.appendChild(imgEl);
            const namePlate = document.createElement('div');
            namePlate.classList.add('character-name-plate');
            namePlate.textContent = charAsset.name;
            portraitWrapper.appendChild(namePlate);
            portraitWrapper.addEventListener('click', () => handleCharacterSelect(index));
            characterGrid.appendChild(portraitWrapper);
        });
        startButton.disabled = true;
    }

    function handleCharacterSelect(index) {
        if (playerSelectedCharIndex !== -1) return;
        new Audio('audio/20H.wav').play().catch(e => console.error("Error playing sound:", e));
        playerSelectedCharIndex = index;
        const playerAsset = characterAssets[index];
        p1SelectedCharImg.src = playerAsset.previewImage;
        p1SelectedCharName.textContent = playerAsset.name;
        document.querySelector(`[data-char-index='${index}']`).classList.add('selected-p1');
        selectionPrompt.textContent = "El PC está eligiendo...";
        setTimeout(() => {
            let randomPcIndex;
            do { randomPcIndex = Math.floor(Math.random() * characterAssets.length); } while (randomPcIndex === index);
            pcSelectedCharIndex = randomPcIndex;
            const pcAsset = characterAssets[pcSelectedCharIndex];
            p2SelectedCharImg.src = pcAsset.previewImage;
            p2SelectedCharName.textContent = pcAsset.name;
            document.querySelector(`[data-char-index='${pcSelectedCharIndex}']`).classList.add('selected-p2');
            selectionPrompt.textContent = "¡Listo para luchar!";
            selectionPrompt.classList.remove('text-yellow-200');
            selectionPrompt.classList.add('text-green-400');
            startButton.disabled = false;
        }, 1000);
    }

    function initGame() {
        if (playerSelectedCharIndex === -1 || pcSelectedCharIndex === -1) { return; }
        const playerAsset = characterAssets[playerSelectedCharIndex];
        const pcAsset = characterAssets[pcSelectedCharIndex];
        activeHitEffects = [];
        players = [
            new Player(100, CANVAS_HEIGHT, playerAsset, true, true),
            new Player(CANVAS_WIDTH - 150, CANVAS_HEIGHT, pcAsset, false, false)
        ];
        players.forEach(p => { p.power = 0; p.isSuperCharged = false; p.isPerformingSuperAttackAnimation = false; p.activePiranhaProjectiles = []; p.activeMoneyWads = []; p.activeCoins = []; p.activeCalculators = []; p.activePapers = []; p.activeKisses = []; p.activeTeddies = []; p.isDashing = false; p.trail = []; p.isCastingCrack = false; p.crackTimer = 0; p.crackOpponentHit = false; p.isSwallowed = false; p.swallowedTimer = 0; p.isStunned = false; p.stunTimer = 0; });
        player1NameDisplay.textContent = players[0].name;
        player2NameDisplay.textContent = players[1].name;
        updateHealthBars();
        updatePowerBars();
        gameActive = true;
        gameOverModal.classList.add('hidden');
        controlsPanel.style.display = 'none';
        const possibleBgs = [ ...(characterBackgrounds[playerAsset.name] || []), ...(characterBackgrounds[pcAsset.name] || []) ];
        if (possibleBgs.length > 0) { const selectedBg = possibleBgs[Math.floor(Math.random() * possibleBgs.length)]; canvas.style.backgroundImage = `url('${selectedBg}')`; canvas.style.backgroundSize = 'cover'; canvas.style.backgroundPosition = 'center'; }
        const startMessageOverlay = document.getElementById('start-message-overlay');
        const startMessageText = document.getElementById('start-message-text');
        startMessageText.textContent = "¡Haz tus clicks para recargar Superpoder!";
        startMessageOverlay.classList.remove('hidden');
        setTimeout(() => { startMessageOverlay.classList.add('hidden'); }, 3000);
        if (!backgroundMusic) { backgroundMusic = new Audio('audio/playbackbattle.mp3'); backgroundMusic.loop = true; }
        backgroundMusic.play().catch(error => console.warn("Error al reproducir música:", error));
        gameHeader.style.display = 'none';
        gameLoop();
    }

    function resetSelectionScreen() {
        gameOverModal.classList.add('hidden');
        controlsPanel.style.display = 'block';
        playerSelectedCharIndex = -1;
        pcSelectedCharIndex = -1;
        p1SelectedCharImg.src = "https://placehold.co/120x120/455a64/e0e0e0?text=P1";
        p1SelectedCharImg.alt = "P1 Seleccionado";
        p1SelectedCharName.textContent = "- Vacío -";
        player1NameDisplay.textContent = "JUGADOR";
        p2SelectedCharImg.src = "https://placehold.co/120x120/455a64/e0e0e0?text=PC";
        p2SelectedCharImg.alt = "PC Seleccionado";
        p2SelectedCharName.textContent = "- Al Azar -";
        player2NameDisplay.textContent = "PC";
        document.querySelectorAll('.character-portrait').forEach(el => { el.classList.remove('selected-p1', 'selected-p2'); });
        selectionPrompt.textContent = "Elige tu luchador para empezar";
        selectionPrompt.classList.add('text-yellow-200');
        selectionPrompt.classList.remove('text-green-400');
        startButton.disabled = true;
        if (backgroundMusic) { backgroundMusic.pause(); backgroundMusic.currentTime = 0; }
        if (player1PowerBar) player1PowerBar.style.width = '0%';
        if (player2PowerBar) player2PowerBar.style.width = '0%';
        if (player1PowerBar) player1PowerBar.classList.remove('super-charged');
        if (player2PowerBar) player2PowerBar.classList.remove('super-charged');
        canvas.style.backgroundImage = 'none';
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = 'rgba(45, 55, 72, 0.5)';
        ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10);
        gameHeader.style.display = 'block';
    }

    function updateHealthBars() {
        if (players.length < 2) return;
        player1HealthBar.style.width = `${(players[0].health / players[0].maxHealth) * 100}%`;
        player2HealthBar.style.width = `${(players[1].health / players[1].maxHealth) * 100}%`;
    }

    function updatePowerBars() {
        if (players.length < 2) return;
        player1PowerBar.style.width = `${(players[0].power / players[0].maxPower) * 100}%`;
        player2PowerBar.style.width = `${(players[1].power / players[1].maxPower) * 100}%`;
        if (players[0].isSuperCharged) { player1PowerBar.classList.add('super-charged'); } else { player1PowerBar.classList.remove('super-charged'); }
        if (players[1].isSuperCharged) { player2PowerBar.classList.add('super-charged'); } else { player2PowerBar.classList.remove('super-charged'); }
    }

    function isAnySuperPowerActive() {
        for (const player of players) { if (player.isDashing || player.isCastingCrack || player.isSwallowed || player.isStunned || player.activePiranhaProjectiles.length > 0 || player.activeMoneyWads.length > 0 || player.activeCalculators.length > 0 || player.activeKisses.length > 0 || player.activeTeddies.length > 0 || player.activePapers.length > 0) { return true; } }
        return false;
    }

    function checkGameOver() {
        if (players.length < 2) return;
        if ((players[0].health <= 0 || players[1].health <= 0) && isAnySuperPowerActive()) { return; }
        let winner = null; let winnerAsset = null;
        if (players[0].health <= 0 && players[1].health <= 0) { winnerMessage.innerHTML = `<span class="text-4xl font-bold text-yellow-400">¡EMPATE!</span>`; }
        else if (players[1].health <= 0) { winner = players[0]; winnerAsset = characterAssets[playerSelectedCharIndex]; }
        else if (players[0].health <= 0) { winner = players[1]; winnerAsset = characterAssets[pcSelectedCharIndex]; }
        if (winner || (players[0].health <= 0 && players[1].health <= 0)) {
            gameActive = false;
            new Audio('audio/9BH.wav').play().catch(e => console.error("Error playing sound:", e));
            gameOverModal.classList.remove('hidden');
            document.getElementById('start-message-overlay').classList.add('hidden');
            gameOverMessage.textContent = "¡Fin del Combate!";
            if (winner && winnerAsset) { winnerMessage.innerHTML = ` <p class="text-2xl mb-4">El ganador es</p> <img src="${winnerAsset.previewImage}" onerror="this.src='https://placehold.co/120x120/455a64/e0e0e0?text=WIN'" class="w-32 h-32 mx-auto rounded-full border-4 border-yellow-400 mb-4 object-contain" style="image-rendering: pixelated;"/> <p class="text-4xl font-bold text-yellow-400">${winner.name.toUpperCase()}</p> `; }
            if (backgroundMusic) { backgroundMusic.pause(); backgroundMusic.currentTime = 0; }
        }
    }

    function drawHitEffects() {
        for (let i = activeHitEffects.length - 1; i >= 0; i--) {
            const effect = activeHitEffects[i];
            ctx.save(); ctx.font = `bold ${effect.size}px 'Comic Sans MS', 'Arial', sans-serif`; ctx.fillStyle = effect.color; ctx.globalAlpha = effect.alpha; ctx.textAlign = 'center'; ctx.translate(effect.x, effect.y); ctx.rotate(effect.rotation); ctx.fillText(effect.text, 0, 0); ctx.restore();
            effect.lifetime--; effect.alpha -= (1.0 / (effect.lifetime + 1)); effect.y -= 0.5; effect.size *= 0.99;
            if (effect.lifetime <= 0) { activeHitEffects.splice(i, 1); }
        }
    }

    function drawSmoke() {
        for (let i = smokeParticles.length - 1; i >= 0; i--) {
            const p = smokeParticles[i];
            ctx.beginPath(); ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2, false); ctx.fillStyle = `rgba(108, 117, 125, ${p.alpha})`; ctx.fill();
            p.x += p.velocityX; p.y += p.velocityY; p.alpha -= 0.02; p.radius += 0.5;
            if (p.alpha <= 0) { smokeParticles.splice(i, 1); }
        }
    }

    function gameLoop() {
        let offsetX = 0; let offsetY = 0;
        if (screenShakeTimeLeft > 0) { offsetX = (Math.random() - 0.5) * 2 * screenShakeMagnitude; offsetY = (Math.random() - 0.5) * 2 * screenShakeMagnitude; ctx.translate(offsetX, offsetY); screenShakeTimeLeft--; if(screenShakeTimeLeft <= 0) { screenShakeMagnitude = 0; } }
        if (!gameActive) { if (offsetX !== 0 || offsetY !== 0) { ctx.translate(-offsetX, -offsetY); } return; }
        ctx.clearRect(-CANVAS_WIDTH, -CANVAS_HEIGHT, CANVAS_WIDTH*2, CANVAS_HEIGHT*2);
        ctx.fillStyle = '#4a5568';
        ctx.fillRect(0, CANVAS_HEIGHT - 10, CANVAS_WIDTH, 10);
        players.forEach(player => { player.update(); player.draw(); });
        drawHitEffects();
        drawSmoke();
        if (offsetX !== 0 || offsetY !== 0) { ctx.translate(-offsetX, -offsetY); }
        requestAnimationFrame(gameLoop);
    }

    continueButton.addEventListener('click', () => {
        splashScreen.style.display = 'none';
        gameWrapper.style.display = 'block';
        gameHeader.style.display = 'block';
        document.body.style.overflow = 'auto';
    });
    restartButton.addEventListener('click', resetSelectionScreen);
    startButton.addEventListener('click', initGame);
    canvas.addEventListener('click', () => { if (gameActive && players.length > 0) { players[0].chargePowerOnClick(); } });
    window.addEventListener('keydown', (event) => { if (event.code === 'Space' && gameActive && players.length > 0 && players[0].isSuperCharged) { event.preventDefault(); players[0].punch(); } });

    createCharacterSelectionUI();
    resetSelectionScreen();
});
