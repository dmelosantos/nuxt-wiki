import Vue from 'vue'
import 'codemirror/lib/codemirror.css';
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/vue-editor';
import vueCodeDiff from 'vue-code-diff'

Vue.component('MarkdownEditor', Editor);
Vue.component('CodeDiff', vueCodeDiff);
