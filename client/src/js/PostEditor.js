import React, { Component } from "react";
import BraftEditor from 'braft-editor';
import { Prompt, withRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Spin } from "antd";

import 'braft-editor/dist/index.css';
import "../scss/postedit.scss";

export class PostEditor extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      blocking: false,
      editorState: null,
      title: null,
      submitDisabled: true,
      titleDirty: !!this.props.post,
      contentDirty: !!this.props.post,
      titleTip: false,
      contentTip: false,
    }

    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleValueChange = this.handleValueChange.bind(this);
  }

  componentDidMount() {
    if (this.props.post) {
      const { meta, content } = this.props.post;
      this.setState({
        title: meta.title,
        subtitle: meta.subtitle,
        backgroundImgUrl: meta.backgroundImgUrl,
        editorState: BraftEditor.createEditorState(content)
      })
    }
  }

  handleEditorChange = (editorState) => {
    let contentStatus = editorState.isEmpty();
    if (contentStatus) {
      this.setState({ contentTip: true });
    } else {
      this.setState({ contentTip: false })
    }
    this.setState({
      editorState,
      submitDisabled: !this.state.titleDirty || this.state.titleTip || contentStatus,
      contentDirty: true,
      blocking: true
    });
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const { history } = this.props;
    this.setState({ loading: true });

    let post = {
      meta: {
        id: uuidv4(),
        title: this.state.title,
        subtitle: this.state.subtitle,
        backgroundImgUrl: this.state.backgroundImgUrl,
        pubtime: Date(),
      },
      content: this.state.editorState.toHTML()
    };

    const redirect = await this.props.handleSubmit(post);

    this.setState({ loading: false, blocking: false }, () => {
      history.push(redirect);
    });
  }

  handleValueChange = (field, value) => {
    switch (field) {
      case "title":
        let titleStatus = value === "";
        if (titleStatus) {
          this.setState({ titleTip: true });
        } else {
          this.setState({ titleTip: false })
        }
        this.setState({
          title: value,
          submitDisabled: !this.state.contentDirty || titleStatus || this.state.contentTip,
          titleDirty: true
        });
        break;
      case "subtitle": this.setState({ subtitle: value }); break;
      case "background": this.setState({ backgroundImgUrl: value }); break;
      default: break;
    }
    this.setState({ blocking: true });
  }

  render() {
    const { title, subtitle, backgroundImgUrl, editorState } = this.state;
    return (
      <div className="container">
        <Prompt
          when={this.state.blocking}
          message="内容未提交，确定要离开吗？"
        />
        <div className="row">
          <div className="col-lg-8 col-md-10 mx-auto">
            <form id="postEditForm" className="mb-5">
              <Spin spinning={this.state.loading} tip="提交中……">
                <h2 className="text-white mb-4">Post Content</h2>
                <div className="form-group">
                  <input
                    onChange={e => this.handleValueChange("title", e.target.value)} 
                    defaultValue={title}
                    placeholder="Post Title" 
                    className="form-control py-4" 
                    />
                  {this.state.titleTip ? <label className="invalid-tip">Title can not be empty!</label> : ""}
                </div>
                <div className="form-group">
                  <input 
                    onChange={e => this.handleValueChange("subtitle", e.target.value)} 
                    defaultValue={subtitle}
                    placeholder="Post Subtitle" 
                    className="form-control py-4" 
                    />
                </div>
                <div className="form-group">
                  <input 
                    onChange={e => this.handleValueChange("background", e.target.value)} 
                    defaultValue={backgroundImgUrl}
                    placeholder="Post Background Image Url" 
                    className="form-control py-4" 
                    />
                </div>
                <div className="editor-wrapper">
                  <BraftEditor
                    contentStyle={{ height: '350px', overflow: 'auto' }}
                    defaultValue={editorState}
                    value={editorState}
                    onChange={this.handleEditorChange}
                  />
                </div>
                {this.state.contentTip ? <label className="invalid-tip">Content can not be empty!</label> : ""}
                <div className="form-group clearfix">
                  <button type="button" className="btn btn-primary float-left" onClick={e => this.handleSubmit(e)} disabled={this.state.submitDisabled}>
                    Submit
                </button>
                </div>
              </Spin>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(PostEditor);