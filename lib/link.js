/**
 * @module link
 */
"use strict";

const R = require("ramda");
const url = require("url");
const template = require("./template");

const ALLOWED = [
  "protocol", 
  "auth", 
  "host", 
  "query",
  "patname",
  "slashes",
  "hash"
];

module.exports = function link (data) {

  let href, page, next, prev, last, links = [];

  if (R.isNil(data.page)) {
    throw new Error("A page must be set");
  }

  if (R.isNil(data.href)) {
    throw new Error("A href must be set");
  }

  if (R.isNil(data.limit)) {
    throw new Error("An item limit must be set");
  }

  if (R.isNil(data.count)) {
    throw new Error("An item count must be set");
  }

  page = data.page;
  next = page + 1;
  prev = page - 1;
  last = Math.ceil(data.count / data.limit);
  href = R.pick(ALLOWED, url.parse(data.href, true));

  // Next page
  if (next < last) {
    href.query.page = next;
    links.push(template("next", url.format(href)));
  }

  // Last page
  if (data.page !== last) {
    href.query.page = last;
    links.push(template("last", url.format(href)));
  }

  // First page
  if (data.page > 1 && last > 1) {
    href.query.page = 1;
    links.push(template("first", url.format(href)));
  }

  // Prev page
  if (prev > 0) {
    href.query.page = prev;
    links.push(template("prev", url.format(href)));
  }

  return links.join(",");
};
