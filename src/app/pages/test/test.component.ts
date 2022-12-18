import {Component, OnInit, ViewChild} from '@angular/core';

/**
 * For Image resize
 */
// import * as QuillNamespace from 'quill';
// let Quill: any = QuillNamespace;
// import ImageResize from 'quill-image-resize-module';
// Quill.register('modules/imageResize', ImageResize);

import Quill from 'quill';
import { ImageResize } from 'quill-image-resize-module';

Quill.register('modules/imageResize', ImageResize);

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  @ViewChild('editor') editor;
  htmlString: string = '';
  quillEditorRef: any;
  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      [{ 'header': 1 }, { 'header': 2 }], // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
      [{ 'direction': 'rtl' }], // text direction
      [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],
      ['clean'], // remove formatting button
      ['link', 'image'], // link and image, video
    ],
    imageResize: true
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSelectionChanged = (event) => {}
  onContentChanged = (event) => {
    this.htmlString = event.html;
  }
  editorCreated(quill: any) {}

}
