/* global AFRAME, THREE */

AFRAME.registerComponent("gesture-handler-model-sequence", {
    schema: {
      enabled: { default: true },
      rotationFactor: { default: 5 },
      minScale: { default: 0.01 },
      maxScale: { default: 8 },
    },
  
    init: function () {
      this.handleScale = this.handleScale.bind(this);
      this.handleRotation = this.handleRotation.bind(this);
      this.handleButton = this.handleButton.bind(this);
  
      this.isVisible = false;
      this.initialScale = this.el.object3D.scale.clone();
      this.scaleFactor = 1;
  
      this.el.sceneEl.addEventListener("markerFound", (e) => {
        this.isVisible = true;
      });
  
      this.el.sceneEl.addEventListener("markerLost", (e) => {
        this.isVisible = false;
      });
    },
  
    update: function () {
      if (this.data.enabled) {
        this.el.sceneEl.addEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.addEventListener("twofingermove", this.handleScale);
        document.addEventListener("btnevt", this.handleButton);

      } else {
        this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
        this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
        document.removeEventListener("btnevt", this.handleButton);
        }
    },
  
    remove: function () {
      this.el.sceneEl.removeEventListener("onefingermove", this.handleRotation);
      this.el.sceneEl.removeEventListener("twofingermove", this.handleScale);
      document.removeEventListener("btnevt", this.handleButton);
    },
  
    handleRotation: function (event) {
      if (this.isVisible) {
        this.el.object3D.rotation.y +=
          event.detail.positionChange.x * this.data.rotationFactor;
        this.el.object3D.rotation.x +=
          event.detail.positionChange.y * this.data.rotationFactor;
      }
    },

    handleScale: function (event) {
      if (this.isVisible) {
        this.scaleFactor *=
          1 + event.detail.spreadChange / event.detail.startSpread;
  
        this.scaleFactor = Math.min(
          Math.max(this.scaleFactor, this.data.minScale),
          this.data.maxScale
        );
  
        this.el.object3D.scale.x = this.scaleFactor * this.initialScale.x;
        this.el.object3D.scale.y = this.scaleFactor * this.initialScale.y;
        this.el.object3D.scale.z = this.scaleFactor * this.initialScale.z;
      }
    },

    handleButton: function (event) {
      if (this.isVisible) {
        console.log ("visible");
        if(this.el.id == event.detail.type+"-model") {
          console.log (this.el.id);
          console.log (event.detail.type+"-model");
          console.log ("match");
          if(this.el.getAttribute("visible", true)) {
            console.log ("true to false");
            this.el.setAttribute("visible", false);
          } else {console.log ("false to true");
            this.el.setAttribute("visible", true);
          }
        }
      }
    },
  });
