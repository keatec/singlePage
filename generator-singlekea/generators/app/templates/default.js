
(function (exports) {

    exports.<%=appname%> = {
        action_showme : function (elem,context,state) {
            console.log('Button was clicked', elem,context,state);
            return state;
        },
        start: function () {
            console.log('Started <%=appname%>')
        }
    }
})(window)