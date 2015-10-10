HnPost = React.createClass({
    componentDidMount: function () {

    },

    render: function () {
        return (
            <div className="hn-post">
                <h3 className="hn-post-title">{this.props.title}</h3>
            </div>
        );
    }
});
