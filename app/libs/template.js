import { enc } from "./helper";

export function getTemplates(serverEndpoint, email, appMode) {
  return new Promise((resolve, reject) => {
    let templates = [];

    if (templates) {
      templates.find((o, i) => {
        if (o.category === "my") {
          templates.splice(i, 1);
        }
      });
    }

    if (appMode === "noAuth") {
      fetch(serverEndpoint + "/templates")
        .then((res) => res.json())
        .then((templates) => {

          resolve(templates);

        })
        .catch((e) => {
          reject(e);
        });
    } else {
      fetch(serverEndpoint + "/get/template", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          templateData: enc(
            JSON.stringify({
              user: enc(email),
              // template_name: this.templateName,
            })
          ),
        },
      })
        .then((res) => res.json())
        .then((d) => {

          resolve(templates);
        })
        .catch((e) => {
          reject(e);
        });
    }
  });
}

export function deleteTemplate(templateId, serverEndpoint, email, appMode) {
  return new Promise((resolve, reject) => {
    if (appMode == "noAuth") {
      // Set the ID of the template to be deleted


      // Send a DELETE request to the REST API endpoint to delete the template
      fetch(serverEndpoint + "/delete-template/" + templateId, {
        method: "DELETE",
      })
        .then((response) => {
          if (response.ok) {
            resolve(response);
          } else {
            reject(response)
          }

        })
        .catch((error) => {
          reject(error)
        });
    } else {
      fetch(serverEndpoint + "/delete/template", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          templateData: enc(
            JSON.stringify({
              user: email,
              template_name: '',
            })
          ),
        },
      })
        .then((res) => res.json())
        .then((d) => {
          resolve(d)
        })
        .catch((e) => {
          reject(e)
        });
    }
  })
}

export function getTemplate(template, serverEndpoint, apiEndpoint, email, appMode) {
  return new Promise((resolve, reject) => {

    if (template.category === "my") {
      let url = "";
      if (appMode === "noAuth") {
        url = serverEndpoint + "/template/" + template.id;
      } else {
        url =
          serverEndpoint +
          "/i/" +
          enc(email) +
          "/" +
          enc(template.name);
      }
      fetch(url + "?version=" + Date.now())
        .then((e) => e.json())
        .then((data) => {

          resolve(data);
        })
        .catch((e) => {
          reject(e)
        });
    } else {

      let directory = apiEndpoint + "/templates/";

      fetch(directory + template.path)
        .then((res) => res.json())
        .then((d) => {

          resolve(d);
        })
        .catch((e) => {
          reject(e)
        });
    }

  })

}

export function getTemplateById(templateID, serverEndpoint) {
  return new Promise((resolve, reject) => {

    let url = serverEndpoint + "/template/" + templateID;

    fetch(url + "?version=" + Date.now())
      .then((e) => e.json())
      .then((data) => {
        resolve(data);
      })
      .catch((e) => {
        reject(e)
      });


  })

}

