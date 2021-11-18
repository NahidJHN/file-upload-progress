const input = document.getElementById("uploadFile");

const uploadArea = document.getElementById("upload-area");
const uploadedFileArea = document.getElementById("uploaded-file-area");
const progressArea = document.getElementById("progress-area");
const form = document.getElementById("file-form");
uploadArea.addEventListener("click", () => {
    input.click();
});

uploadArea.addEventListener("dragover", (e) => {
    e.preventDefault();
    document.getElementsByClassName("app-border")[0].style.border =
        "3px dashed blue";
});

uploadArea.addEventListener("dragleave", () => {
    document.getElementsByClassName("app-border")[0].style.border =
        "2px dashed rgb(121, 118, 118)";
});

uploadArea.addEventListener("drop", (event) => {
    event.preventDefault();
    let file = event.dataTransfer.files[0];
    let filename = file.name;
    sendFile(filename, file);
    document.getElementsByClassName("app-border")[0].style.border =
        "2px dashed rgb(121, 118, 118)";
});

input.addEventListener("change", (event) => {
    let file = event.target.files[0];
    let filename = file.name;
    sendFile(filename, file);
});

function sendFile(filename, file) {
    let xhr = new XMLHttpRequest();

    xhr.open("POST", "/upload");
    xhr.upload.addEventListener("progress", (e) => {
        let loaded = e.loaded;
        let totalSize = e.total;
        let loadWidth = Math.round((loaded * 100) / totalSize);

        let actualName;
        if (filename.length > 10) {
            let splitFileName = filename.slice(0, 10);
            let lastWords = filename.slice(-5, -1);

            actualName = splitFileName + " ... ." + lastWords;
        }

        let progressHTML = `
        <div class="alert-success row">
                    <div class="progress_bar alert-success row">
                            <div class="col-md-2 progress-file-icon">
                            <i class="fas fa-file"></i>
                        </div>
                        <div class="col-md-10">
                            <div class="progress-file-info">
                                <div
                                    class="
                                        progress-file-name
                                        d-flex
                                        justify-content-between
                                    "
                                >
                                    <span>${actualName}</span>
                                    <span class="persentage">${loadWidth}%</span>
                                </div>
                                <div class="progress-line">
                                    <div style="width:${loadWidth}%" class="file-progress"></div>
                                </div>
                            </div>
                        </div>
                        </div>
                        `;

        progressArea.innerHTML = progressHTML;

        if (loaded === totalSize) {
            progressArea.innerHTML = "";
            let uploaderHTML = `                    <div
                        class="row alert-primary p-1"
                        id="upload-file"
                        class="uploader-file"
                    >
                        <div class="col-md-2 progress-file-icon">
                            <i class="fas fa-file"></i>
                        </div>
                        <div class="col-md-10">
                            <div class="progress-file-info">
                                <div
                                    class="
                                        progress-file-name
                                        d-flex
                                        justify-content-between
                                    "
                                >
                                    <span>${actualName}</span>
                                    <span class="persentage">&#10003;</span>
                                </div>
                            </div>
                        </div>
                    </div>`;

            uploadedFileArea.insertAdjacentHTML("afterbegin", uploaderHTML);
        }
    });

    let formData = new FormData(form);

    formData.append("file", file);

    xhr.send(formData);
}
