import React, { Component } from 'react'
import "./App.css"
import html2PDF from 'jspdf-html2canvas';

export default class App extends Component {

    state = {
      canvas : null,
      ctx :null
    }

    componentDidMount(){
      const canvas = document.querySelector('#canvas')
      this.setState({
        canvas : canvas,
      })
      if(canvas){
        const ctx = canvas.getContext('2d')
        this.setState({
          ctx : ctx
        })
      }
    }

    painting = false
    start_canvas_x = 50
    start_canvas_y = 90


    startPosition = (e)=>{
      this.painting = true
      this.draw(e)
    }

    finishPosition = ()=>{
      this.painting = false
      this.state.ctx.beginPath();
    }

    draw = (e)=>{
        if(!this.painting) return ;
        this.state.ctx.lineWidth = 2;
        this.state.ctx.lineCap = 'round';
        this.state.ctx.lineTo(e.clientX-this.start_canvas_x,e.clientY-this.start_canvas_y);
        this.state.ctx.stroke();
        this.state.ctx.beginPath();
        this.state.ctx.moveTo(e.clientX-this.start_canvas_x,e.clientY-this.start_canvas_y)	
    }
    
    download = ()=>{

      html2PDF(this.state.canvas, {
        jsPDF: {
          
          unit: 'px',
        },
        imageType: 'image/jpeg',
        output: 'paint.pdf'
      });
    }

    onClick = (e)=>{
      this.state.ctx.strokeStyle = e.target.id
    }

  render() {
    return (
      <div id = 'skretch'>
        <div class = 'color_div'>
          <div class = 'color' id = 'green' title = 'green' onClick = {this.onClick} ></div>
          <div class = 'color' id = 'yellow' title = 'yellow'onClick = {this.onClick}></div>
          <div class = 'color' id = 'red' title = 'red' onClick = {this.onClick}></div>
          <div class = 'color' id = 'black' title = 'black' onClick = {this.onClick}></div>
        </div>

          <canvas id='canvas' width = '400px' height = '400px' onMouseMove ={this.draw} onMouseUp = {this.finishPosition} onMouseDown = {this.startPosition}></canvas>

          <br/>
          <button id ='menu' onClick = {this.download}>Download PDF</button>
      </div>
    )
  }
}
