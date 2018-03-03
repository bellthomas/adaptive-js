registerNamespace("uk.org.adaptive.typeWarning");

self.isActive = false;
const flashColour = "#ff0000";

var currentlyFlashing = false;

registerNSMethod(self, "apply", function() {
   if (self.isActive) self.remove();
   
   self.isActive = true;
   window.addEventListener("keypress", self.onKeyPress);
});

registerNSMethod(self, "remove", function() {
   self.isActive = false;
   window.removeEventListener("keypress", self.onKeyPress);
});

self.onKeyPress = function(e) {
   if (!e.ctrlKey && !e.altKey && !e.metaKey && e.target.tagName !== "TEXTAREA" && e.target.tagName !== "INPUT") flash();
}

const flash = function() {
   if (currentlyFlashing) return;
   currentlyFlashing = true;
   
   var cover = document.createElement("div");
   
   cover.style.position = "fixed";
   cover.style.left = "0px";
   cover.style.top = "0px";
   cover.style.width = "100%";
   cover.style.height = "100%";
   cover.style.zIndex = "999999999";
   
   var opacity = 0.7;
   
   cover.style.backgroundColor = flashColour;
   cover.style.opacity = opacity;
   document.body.appendChild(cover);
   
   // Animation
   var delta = 5;
   var id = setInterval(frame, delta);
   
   function frame() {
      if (opacity <= 0) {
         clearInterval(id);
         cover.parentNode.removeChild(cover);
         currentlyFlashing = false;
      } else {
         opacity -= 0.01;
         cover.style.opacity = opacity;
      }
   }
};