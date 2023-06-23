import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPost } from '../../interfaces/post.interface';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { StorageService } from '../../../services/storage.service';
import { PostApiService } from '../../services/post-api.service';
import { IComment } from '../../interfaces/comment.interface';
import { BaseComponent } from '../../../components/base-component/base.component';
import { EPost } from '../../enums/post.enum';
import { USER_KEY } from '../../../constants/storage.constant';
import { Subject, takeUntil } from 'rxjs';
import {IUser} from "../../../login/interfaces/user.interface";
import {ValidationService} from "../../../services/validation.service";

@Component({
  selector: 'app-comments-dialog',
  templateUrl: './comments-dialog.component.html',
  styleUrls: ['./comments-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommentsDialogComponent
  extends BaseComponent
  implements OnInit, OnDestroy
{
  public form: FormGroup;

  public post: IPost;

  public readonly EPost = EPost;

  private destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public postId: string,
    protected override readonly _validation: ValidationService,
    private readonly _dialogRef: MatDialogRef<CommentsDialogComponent>,
    private readonly _formBuilder: FormBuilder,
    private readonly _storageService: StorageService,
    private readonly _postApiService: PostApiService,
    private readonly _changeDetectorRef: ChangeDetectorRef
  ) {
    super(_validation);
  }

  ngOnInit(): void {
    this.buildForm();
    this.fetchPost();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  public closeDialog(): void {
    this._dialogRef.close(this.post.comments);
  }

  public createComment(): void {
    this._postApiService
      .updatePost(this.postId, {
        comments: this.getComments(this.post.comments),
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.fetchPost();
          this.getControl(EPost.COMMENTS).setValue(null);
        },
      });
  }

  private getComments(comments: IComment[]): IComment[] {
    const userName = this._storageService.getItem<IUser>(USER_KEY).name;
    const newComment = {
      userName,
      text: this.getControl(EPost.COMMENTS).value,
    };

    comments ? comments.push(newComment) : (comments = [newComment]);

    return comments;
  }

  private buildForm(): void {
    this.form = this._formBuilder.group({
      [EPost.COMMENTS]: new FormControl(null),
    });
  }

  private fetchPost(): void {
    this._postApiService
      .getPostById(this.postId)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.post = data;
        this._changeDetectorRef.markForCheck();
      });
  }
}
