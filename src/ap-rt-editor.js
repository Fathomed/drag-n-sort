function getStickyTopOffset() {
    return window.innerWidth > 768 ? 80 : 64;
  }
  window.Wized = window.Wized || [];
  window.Wized.push(async (Wized) => {
    // Wait for the Get_report_edit request to finish
    await Wized.requests.waitFor("Get_listing_edit");
  
    // Assuming the editCopy variable is updated by the Get_report_edit request
    // and contains the initial content for the RedactorX editor
    // Ensure editCopy is not null or undefined
    if (Wized.data && Wized.data.v && Wized.data.v.editCopy) {
      // Initialize RedactorX with the content from editCopy
      RedactorX("#entry", {
        content: Wized.data.v.editCopy, // Use editCopy as the initial content
        // Specify the plugins to connect
        // Additional RedactorX initialization options here
        toolbar: {
          hide: ["html", "deleted", "link"],
          stickyTopOffset: getStickyTopOffset(), // Use the dynamic function
        },
        format: ['p', 'ul', 'ol', 'address'],
        addbar: false,
        shortcuts: false,
  
        subscribe: {
          "app.start": function () {
            // Access and set min-height of the editor content area
            var $editorNode = this.app.editor.dom(".rx-editor.rx-content");
            $editorNode.css({ "min-height": "15rem", padding: "1.75rem" });
  
            // Update Wized.data.v.bodyCopy with the initial content of the editor
            if (Wized.data && Wized.data.v) {
              Wized.data.v.bodyCopy = Wized.data.v.editCopy; // Set initial content
            }
          },
          "editor.change": function (event) {
            // Update Wized.data.v.bodyCopy with the current content of the editor
            if (Wized.data && Wized.data.v) {
              Wized.data.v.bodyCopy = this.app.editor.getContent();
            }
          },
        },
      });
    } else {
      console.error("editCopy is not available.");
      // Specify the plugins to connect and other initialization options as before
      RedactorX("#entry", {
        // Specify the plugins to connect
        subscribe: {
          "app.start": function () {
            // Access and set min-height of the editor content area
            var $editorNode = this.app.editor.dom(
              ".rx-editor.rx-reset.rx-content"
            );
            $editorNode.css({ "min-height": "15rem", padding: "2rem" });
          },
          "editor.change": function (event) {
            // Update Wized.data.v.bodyCopy with the current content of the editor
            if (Wized.data && Wized.data.v) {
              Wized.data.v.bodyCopy = this.app.editor.getContent();
            }
          },
        },
      });
    }
  });