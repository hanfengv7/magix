/**
 * @fileOverview 对magix/view的扩展
 * @version 1.0
 * @author 行列
 */
define('mxext/view', ["magix/magix", "magix/view", "magix/router"], function(Magix, View, Router) {
    eval(Magix.include('../tmpl/view', 1));
    return MxView;
});