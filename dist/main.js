!function (t) {
    var e = {};

    function r(a) {
        if (e[a]) return e[a].exports;
        var i = e[a] = { i: a, l: !1, exports: {} };
        return t[a].call(i.exports, i, i.exports, r), i.l = !0, i.exports;
    }

    r.m = t;
    r.c = e;
    r.d = function (t, e, a) {
        r.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: a });
    };
    r.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag &&
            Object.defineProperty(t, Symbol.toStringTag, { value: "Module" });
        Object.defineProperty(t, "__esModule", { value: !0 });
    };
    r.t = function (t, e) {
        if (1 & e && (t = r(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var a = Object.create(null);
        if (r.r(a),
            Object.defineProperty(a, "default", { enumerable: !0, value: t }),
            2 & e && "string" != typeof t) {
            for (var i in t)
                r.d(a, i, function (e) { return t[e] }.bind(null, i));
        }
        return a;
    };
    r.n = function (t) {
        var e = t && t.__esModule ?
            function () { return t.default; } :
            function () { return t; };
        return r.d(e, "a", e), e;
    };
    r.o = function (t, e) { return Object.prototype.hasOwnProperty.call(t, e); };
    r.p = "/dist/";
    r(r.s = 1);
}([
    function (t, e, r) { },
    function (t, e, r) {
        "use strict";
        r.r(e);
        r(0);

        function a(t, e) {
            for (var r = 0; r < e.length; r++) {
                var a = e[r];
                a.enumerable = a.enumerable || !1;
                a.configurable = !0;
                "value" in a && (a.writable = !0);
                Object.defineProperty(t, a.key, a);
            }
        }

        var i = function () {
            function t(e, r) {
                this.xCoord = e;
                this.yCoord = r;
                this.platformWidth = 45;
                this.platformHeight = 25;
                this.used = 0;
                this.image = new Image;
                this.image.src = "src/images/brown platform merged transparent.png";
            }

            var e, r, i;
            return (
                e = t,
                (r = [//להוריד את זה ממערך כי הורדנו את הdrawUnusedPlatform
                    {
                        key: "drawUsedPlatform",
                        value: function (t, e, r) {
                            r.drawImage(this.image, t, e, this.platformWidth, this.platformHeight);
                        }
                    }
                ]) && a(e.prototype, r),
                i && a(e, i),
                t
            );
        }();

        function s(t, e) {
            for (var r = 0; r < e.length; r++) {
                var a = e[r];
                a.enumerable = a.enumerable || !1;
                a.configurable = !0;
                "value" in a && (a.writable = !0);
                Object.defineProperty(t, a.key, a);
            }
        }

        var n = function () {
            function t(e) {
                this.canvas = e;
                this.characterHeight = 45;
                this.characterWidth = 30;
                this.characterX = (e.width - this.characterWidth) / 2;
                this.characterY = 0;
                this.rightPressed = !1;
                this.leftPressed = !1;
                this.jump = !1;
                this.gravity = 9;
                this.yVelocity = 3;
                this.image = new Image;
                this.image.src = "src/images/p1_front.png";
            }

            var e, r, a;
            return (
                e = t,
                (r = [
                    {
                        key: "characterMove",
                        value: function () {
                            if (this.rightPressed) {
                                this.characterX += 6;
                                this.characterX + this.characterWidth > this.canvas.width &&
                                    (this.characterX = 0);
                            } else if (this.leftPressed) {
                                this.characterX -= 6;
                                this.characterX + this.characterWidth < 0 &&
                                    (this.characterX = this.canvas.width - this.characterWidth);
                            }
                        }
                    },
                    {
                        key: "outOfRange",
                        value: function () {
                            return this.characterY > this.canvas.height + this.characterHeight;
                        }
                    },
                    {
                        key: "drawcharacter",
                        value: function (t) {
                            t.drawImage(this.image, this.characterX, this.characterY, this.characterWidth, this.characterHeight);
                        }
                    },
                    {
                        key: "keyDownHandler",
                        value: function (t) {
                            if ("Right" == t.key || "ArrowRight" == t.key) this.rightPressed = !0;
                            else if ("Left" == t.key || "ArrowLeft" == t.key) this.leftPressed = !0;
                        }
                    },
                    {
                        key: "keyUpHandler",
                        value: function (t) {
                            if ("Right" == t.key || "ArrowRight" == t.key) this.rightPressed = !1;
                            else if ("Left" == t.key || "ArrowLeft" == t.key) this.leftPressed = !1;
                        }
                    }
                ]) && s(e.prototype, r),
                a && s(e, a),
                t
            );
        }();

        function c(t, e) {
            for (var r = 0; r < e.length; r++) {
                var a = e[r];
                a.enumerable = a.enumerable || !1;
                a.configurable = !0;
                "value" in a && (a.writable = !0);
                Object.defineProperty(t, a.key, a);
            }
        }

        var h = (function () {
            function t() {
                if (!(this instanceof t)) throw new TypeError("Cannot call a class as a function");
                this.canvas = document.getElementById("myCanvas");
                this.ctx = this.canvas.getContext("2d");
                this.platforms = [];
                this.character = new n(this.canvas);
                this.score = 0;
                this.keyDownHandler = this.keyDownHandler.bind(this);
                this.keyUpHandler = this.keyUpHandler.bind(this);
            }

            var e, r, a;
            e = t;
            r = [
                {
                    key: "draw",
                    value: function () {
                        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
                        this.character.drawcharacter(this.ctx);
                        this.drawPlatforms();
                        this.drawScore();
                        this.characterJump();
                        this.character.characterMove();

                        var t = requestAnimationFrame(this.draw.bind(this));
                        if (this.character.outOfRange()) {
                            var e = document.getElementById("play-again"),
                                r = document.getElementById("play-again-container");
                            e.classList.remove("removed");
                            r.classList.remove("removed");
                            cancelAnimationFrame(t);
                        }
                    },
                },
                {
                    key: "getRandomNum",
                    value: function (t, e) {
                        return Math.floor(Math.random() * (e - t)) + t;
                    },
                },
                {
                    key: "randomPlatforms",
                    value: function () {
                        for (var t = this.getRandomNum(15, 20), e = 0; e < t; e++) {
                            var r = this.getRandomNum(0, this.canvas.width),
                                a = this.getRandomNum(0, this.canvas.height);
                            this.platforms[e] = new i(r, a);
                        }
                    },
                },
                {
                    key: "drawPlatforms",
                    value: function () {
                        for (var t = 0; t < this.platforms.length; t++) {
                            if (this.platforms[t]) {
                                var platform = this.platforms[t];
                                if (platform.yCoord > this.canvas.height) {
                                    platform.yCoord = this.getRandomNum(-75, 0);
                                    platform.xCoord = this.getRandomNum(0, this.canvas.width);
                                    platform.used = 0;
                                }
                                platform.yCoord += 2;
                                //platform.use לא שימושי ואפשר למחוק את התכונה הזו
                                platform.drawUsedPlatform(platform.xCoord, platform.yCoord, this.ctx);
                            }
                        }
                    },
                },
                {
                    key: "characterJump",
                    value: function () {
                        if (this.character.jump) {
                            if (this.character.yVelocity >= 0) {
                                this.character.characterY -= 3 * this.character.yVelocity;
                                this.character.yVelocity -= 0.1;
                            } else {
                                this.character.jump = !1;
                                this.character.yVelocity = 3;
                            }
                        } else {
                            this.collisionDetection();
                            this.character.characterY += this.character.gravity;
                        }
                    },
                },
                {
                    key: "drawScore",
                    value: function () {
                        this.ctx.font = "16px Chelsea Market";
                        this.ctx.fillStyle = "white";
                        this.ctx.fillText("Score: " + this.score, 8, 20);
                    },
                },
                {
                    key: "collisionDetection",
                    value: function () {
                        for (var t = 0; t < this.platforms.length; t++) {
                            var platform = this.platforms[t];
                            var n = this.character.characterX,
                                c = this.character.characterY + this.character.characterHeight,
                                h = this.character.characterX + this.character.characterWidth,
                                o = this.character.characterY + this.character.characterHeight;

                            if (
                                (n > platform.xCoord &&
                                    n < platform.xCoord + 40 &&
                                    c > platform.yCoord &&
                                    c < platform.yCoord + 8) ||
                                (h > platform.xCoord &&
                                    h < platform.xCoord + 40 &&
                                    o > platform.yCoord &&
                                    o < platform.yCoord + 8)
                            ) {
                                if (platform.used === 0) this.score++;
                                platform.used = 1;
                                this.character.jump = !0;
                            }
                        }
                    },
                },
                {
                    key: "keyDownHandler",
                    value: function (t) {
                        if (t.key === "Right" || t.key === "ArrowRight") this.character.rightPressed = !0;
                        else if (t.key === "Left" || t.key === "ArrowLeft") this.character.leftPressed = !0;
                    },
                },
                {
                    key: "keyUpHandler",
                    value: function (t) {
                        if (t.key === "Right" || t.key === "ArrowRight") this.character.rightPressed = !1;
                        else if (t.key === "Left" || t.key === "ArrowLeft") this.character.leftPressed = !1;
                    },
                },
            ];
            c(e.prototype, r);
            a && c(e, a);
            return t;
        })();

        function o() {
            var game = new h();
            game.draw();
            window.addEventListener("keydown", game.keyDownHandler, !1);
            window.addEventListener("keyup", game.keyUpHandler, !1);
            game.randomPlatforms();
        }

        window.addEventListener("DOMContentLoaded", function () {
            var playBtn = document.getElementById("play"),
                replayBtn = document.getElementById("play-again"),
                playContainer = document.getElementById("play-container"),
                replayContainer = document.getElementById("play-again-container");

            replayBtn.classList.add("removed");
            replayContainer.classList.add("removed");

            playBtn.addEventListener("click", function () {
                o();
                playBtn.classList.add("removed");
                playContainer.classList.add("removed");
            });

            replayBtn.addEventListener("click", function () {
                o();
                replayBtn.classList.add("removed");
                replayContainer.classList.add("removed");
            });
        });

    }
]);
