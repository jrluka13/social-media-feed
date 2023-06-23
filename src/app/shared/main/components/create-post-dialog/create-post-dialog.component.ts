import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {
  FormBuilder, FormControl,
  FormGroup, Validators,
} from '@angular/forms';

import { PostApiService } from '../../services/post-api.service';
import { StorageService } from '../../../services/storage.service';
import {BaseComponent} from "../../../components/base-component/base.component";
import {EPost} from "../../enums/post.enum";
import {USER_KEY} from "../../../constants/storage.constant";
import {IUser} from "../../../login/interfaces/user.interface";
import {ValidationService} from "../../../services/validation.service";

@Component({
  selector: 'app-create-post-dialog',
  templateUrl: './create-post-dialog.component.html',
  styleUrls: ['./create-post-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreatePostDialogComponent extends BaseComponent implements OnInit {
  public form: FormGroup;

  public readonly EPost = EPost;

  private _uid: string;

  constructor(
    protected override readonly _validation: ValidationService,
    private readonly _formBuilder: FormBuilder,
    private readonly _storageService: StorageService,
    private readonly _postApiService: PostApiService
  ) {
    super(_validation);
  }

  ngOnInit(): void {
    this.buildForm();
    this.setInitialAuthorValue();
  }

  public createPost(): void {
    this._postApiService
      .addPost({ ...this.form.value, userId: this._uid })
      .subscribe();
  }

  private buildForm(): void {
    this.form = this._formBuilder.group({
      [EPost.AUTHOR]: new FormControl(null),
      [EPost.CONTENT]: new FormControl(null, [Validators.required]),
      [EPost.CREATED_DATE]: new FormControl(new Date()),
      [EPost.LIKES]: new FormControl([]),
      [EPost.COMMENTS]: new FormControl([]),
    });
  }

  private setInitialAuthorValue(): void {
    const {id, name} = this._storageService.getItem<IUser>(USER_KEY) || {};

    this._uid = id;
    this.getControl(EPost.AUTHOR).setValue(name);
  }
}
