# CQASO基础架构工具库

[![Travis][build-badge]][build]  [![Coveralls][coveralls-badge]][coveralls]

## 目的 / 目标

- 为了快速构建CQASO网站,以及快速搭建CQASO相关网站，框架。作为底层工具输出。
- 根据CQASO的工具需求，完善工具库，为后续开发做准备。
- 在构建工具库的过程当中，完善前端团队的代码规范的一致性，统一注释风格。
- 所有模块都要完整测试，覆盖率不少于80%
- 提升模块意识，每个模块不超过300行，代码语义化，声明变量语义化，规范化。

## 相关文档

[cqaso-utils 单元测试介绍](./test/README.md)

[build-badge]: https://img.shields.io/travis/CQASO/cqaso-utils/master.svg?style=flat-square
[build]: https://travis-ci.org/CQASO/cqaso-utils
[coveralls-badge]: https://img.shields.io/coveralls/CQASO/cqaso-utils.svg?style=flat-square
[coveralls]: https://coveralls.io/github/CQASO/cqaso-utils

## 单元测试介绍

之前写过的测试都是针对简单的工具方法，用的 mocha + chai 写。本工具库需要一个浏览器环境，于是选择 Karma + phamtonjs 环境，因为涉及到了 Babel 和 commonjs 模块系统，于是用webpack做babel+commonjs编译。

### 测试环境

- PhantomJS
- Chrome
- Firefox

### 使用

> npm test

> open coverage/lcov-report/index.html
