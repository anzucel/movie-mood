import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as faceapi from 'face-api.js';

@Component({
  selector: 'app-webcam',
  templateUrl: './webcam.component.html',
  styleUrls: ['./webcam.component.css']
})
export class WebcamComponent implements OnInit {

  WIDTH = 700;
  HEIGHT = 800;

  @ViewChild('video',{ static: true })
  public video!: ElementRef;

  @ViewChild('canvas',{ static: true })
  public canvasRef!: ElementRef;

  constructor(private elRef: ElementRef) { }

  stream: any;
  detection: any;
  resizedDetections: any;
  canvas: any;
  canvasEl: any;
  displaySize: any;
  videoInput: any;

  async ngOnInit() {
    Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri('../../../assets/models'),
    await faceapi.nets.faceLandmark68Net.loadFromUri('../../../assets/models'),
    await faceapi.nets.faceRecognitionNet.loadFromUri('../../../assets/models'),
    await faceapi.nets.faceExpressionNet.loadFromUri('../../../assets/models'),]).then(() => this.startVideo());
  }

  startVideo() {
  this.videoInput = this.video.nativeElement;

  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
      .then((stream) => {
        this.videoInput.srcObject = stream;
        this.detect_Faces();
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("getUserMedia no está soportado en este navegador.");
  }
}

  async detect_Faces() {
    this.elRef.nativeElement.querySelector('video').addEventListener('play', async () => {
      this.canvas = await faceapi.createCanvasFromMedia(this.videoInput);
      this.canvasEl = this.canvasRef.nativeElement;
      this.canvasEl.appendChild(this.canvas);
      this.canvas.setAttribute('id', 'canvas');
      this.canvas.setAttribute(
        'style',`position: absolute;
        bottom: 0px;
        left: -72px;
        z-index: 100`
        
      );
      this.displaySize = {
        width: 700,
        height: 540,
      };
      faceapi.matchDimensions(this.canvas, this.displaySize);
      setInterval(async () => {
        this.detection = await faceapi.detectAllFaces(this.videoInput,  new  faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
        this.resizedDetections = faceapi.resizeResults(
          this.detection,
          this.displaySize
        );
        this.canvas.getContext('2d').clearRect(0, 0,      this.canvas.width,this.canvas.height);
        faceapi.draw.drawDetections(this.canvas, this.resizedDetections);
        faceapi.draw.drawFaceLandmarks(this.canvas, this.resizedDetections);
        faceapi.draw.drawFaceExpressions(this.canvas, this.resizedDetections);
      }, 100);
    });
  }

}