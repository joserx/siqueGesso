import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-view-msg',
  templateUrl: './view-msg.component.html',
  styleUrls: ['./view-msg.component.scss'],
})
export class ViewMsgComponent implements OnInit {
  viewMsg: FormGroup = this.fb.group({
    titulo: [{ value: '', disabled: true }],
    texto: [{ value: '', disabled: true }],
  });

  @Input() msg: any;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  loadForm(msgInput: any) {
    this.viewMsg = new FormGroup({
      titulo: new FormControl({
        value: msgInput.titulo,
        disabled: true,
      }),
      texto: new FormControl({
        value: msgInput.texto,
        disabled: true,
      }),
    });
  }
}
