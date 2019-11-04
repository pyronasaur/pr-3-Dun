class RenCanvas {
  constructor(w, h, canvLoc) {
    const canvas = canvLoc || document.createElement("canvas");
    this.w = canvas.width = w;
    this.h = canvas.height = h;
    this.view = canvas;
    this.ctx = canvas.getContext("2d");
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.textBaseline = "top";
    this.fitXandY(this.view);
    this.drewBack = false;
    this.screenshot = "";
  }

  fitXandY(canvas) {
    canvas.style.width ='100%';
    canvas.style.height='100%';
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  drawStars(ctx, w, h) {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = "#555";

    let x, y, radius;

    for (let i = 0; i < 550; i++) {
      x = Math.random() * w;
      y = Math.random() * h;
      radius = Math.random() * 3;

      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2, false);
      ctx.fill();
    }
  }


  render(container, clear = true) {
    let that = this;
    if (container.visible == false) {
      return;
    }
    const { ctx } = this;

    function renderRec(container) {
      // Render the container children
      container.children.forEach(child => {
        //console.log(child)
        if (child.visible == false) {
          return;
        }
        ctx.save();

        // Handle transforms
        if (child.pos) {
          ctx.translate(Math.round(child.pos.x), Math.round(child.pos.y));
        }
        if (child.anchor) ctx.translate(child.anchor.x, child.anchor.y);
        if (child.scale) ctx.scale(child.scale.x, child.scale.y);
        if (child.rotation) {
          const px = child.pivot ? child.pivot.x : 0;
          const py = child.pivot ? child.pivot.y : 0;
          ctx.translate(px, py);
          ctx.rotate(child.rotation);
          ctx.translate(-px, -py);
        }

        // Draw the leaf nodes
        if (child.text) {
          const { font, fill, align } = child.style;
          if (font) ctx.font = font;
          if (fill) ctx.fillStyle = fill;
          if (align) ctx.textAlign = align;
          ctx.fillText(child.text, 0, 0);
        } else if (child.texture) {
          ctx.drawImage(child.texture.img, 0, 0);
        } else if (child === "starfield") {
          if(!that.drewBack) {
            console.log("its a string!");
            // this.drawStars(ctx, this.w, this.h);
            //ctx.fillStyle = "black";
            //ctx.fillRect(0, 0, this.w, this.h);
            ctx.fillStyle = "#555";

            let x, y, radius;

            for (let i = 0; i < 550; i++) {
              x = Math.random() * that.w;
              y = Math.random() * that.h;
              radius = Math.random() * 3;

              ctx.beginPath();
              ctx.arc(x, y, radius, 0, Math.PI * 2, false);
              ctx.fill();
          }

          that.screenshot = new Image();
          that.screenshot.src = that.view.toDataURL("image/png");
          that.screenshot.style.width = that.w;
          that.screenshot.style.height = that.h;
          that.drewBack = true;
        }
        else if(that.drewBack) {
          ctx.drawImage(that.screenshot, 0, 0);
        }    
      }

        // Render any child sub-nodes
        if (child.children) {
          renderRec(child);
        }
        ctx.restore();
      });
    }

    if (clear) {
      ctx.clearRect(0, 0, this.w, this.h);
    }
    renderRec(container);
  }
}

export default RenCanvas;
