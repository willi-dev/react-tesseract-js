import React, { Component } from 'react';
import { Tesseract } from 'tesseract.ts';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: '',
      imageViewer: ''
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    let myImg = this.state.image;
    console.log('in handle submit image', myImg);
    Tesseract.recognize(myImg)
      .progress(message => console.log(message))
      .catch(err => console.log(err))
      .then(result => console.log(result))
      .finally(resultOrError => console.log(resultOrError))
  }

  imageChange = (e) => {
    e.preventDefault();
    let reader = new FileReader();
    let image = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        image,
        imageViewer: reader.result,
      })

    }
    reader.readAsDataURL(image);
  }

  render() {
    let imageViewer = this.state.imageViewer;
    let $imageViewer = null;
    if (imageViewer) {
      $imageViewer = (<img src={imageViewer} className="preview-img" alt="test"/>);
    } else {
      $imageViewer = (<div className="previewText">Pilih gambar...</div>)
    }
    return (
      <div className="App">
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input className="fileInput"
            type="file"
            onChange={(e) => this.imageChange(e)}/>
          <button className="submitButton"
            type="submit"
            onClick={(e) => this.handleSubmit(e)}>
            Upload Image
          </button>
        </form>
        <div className="imgPreview">
          {$imageViewer}
        </div>
      </div>
    );
  }
}

export default App;
