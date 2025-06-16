import { defineEventHandler } from "h3";

export default defineEventHandler(() => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Swagger Docs</title>
        <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist/swagger-ui.css" />
      </head>
      <body>
        <div id="swagger-ui"></div>
        <script src="https://unpkg.com/swagger-ui-dist/swagger-ui-bundle.js"></script>
        <script>
          window.onload = function () {
            SwaggerUIBundle({
              url: '/api/docs-json',
              dom_id: '#swagger-ui',
              operationsSorter: 'alpha',
              tagsSorter: 'alpha',
            });
          };
        </script>
      </body>
    </html>
  `;
});
