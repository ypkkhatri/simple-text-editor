import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {

  private name: string;
  content: string;
  config: any;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.config = {
      lineNumbers: true,
      theme: this.getMappedTheme('')
    };

    this.route.queryParams
      .pipe(filter((params: any) => Object.keys(params).length > 0))
      .subscribe(params => {
        console.log(params);
        this.name = params.name ? params.name : '';
        const theme = params.theme ? params.theme : '';
        this.config.theme = this.getMappedTheme(theme);
        this.content = localStorage.getItem(this.name + '-content');
      });
  }

  setEditorContent() {
    localStorage.setItem(this.name + '-content', this.content);
  }

  private getMappedTheme(theme: string) {
    if (theme === 'dark') {
      return 'darcula';
    } else {
      return 'mdn-like';
    }
  }
}
