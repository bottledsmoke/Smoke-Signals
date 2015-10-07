trackMouseMovement() {
    document.onmousemove = handleMouseMove;
    function handleMouseMove(event) {
      var eventDoc;
      var doc;
      var body;

      const evt = event || window.event; // IE-ism

      // If pageX/Y aren't available and clientX/Y are,
      // calculate pageX/Y - logic taken from jQuery.
      // (This is to support old IE)
      if (evt.pageX === null && evt.clientX !== null) {
        eventDoc = (evt.target && evt.target.ownerDocument) || document;
        doc = eventDoc.documentElement;
        body = eventDoc.body;

        evt.pageX = evt.clientX +
          (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);
        evt.pageY = evt.clientY +
          (doc && doc.scrollTop || body && body.scrollTop || 0) -
          (doc && doc.clientTop || body && body.clientTop || 0 );
      }

      console.log(evt.pageX, evt.pageY);
    }
  }
  untrackMouse() {
    document.onmousemove = null;
  }