/**
 * @module template
 */
"use strict";

const url = require("url");

module.exports = function (rel, href) {
  href.query.page = page;
  return `<${href}>; rel="${rel}"`;
}