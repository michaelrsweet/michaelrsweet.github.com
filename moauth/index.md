---
title: mOAuth
subtitle: A Basic OAuth 2.0 Client/Server Implementation
author: Michael R Sweet
copyright: Copyright © 2017-2019 by Michael R Sweet
project: moauth
project_name: mOAuth
logo: moauth-160.png
html_doc: moauth.html
snap: moauth
layout: project-news
language: C
lgtm: cpp
platforms: Linux | macOS | Unix
---

mOAuth is a basic OAuth 2.0 client/server implementation designed for testing
and development of OAuth-based services.  The client library supports
authorization of native macOS, iOS, and Linux applications with PKCE.  The
server is both an Authorization Server and a Resource Server that supports:

- User account authentication/authorization using PAM
- Traditional web-based authorization grants with redirection as well as
  resource owner password credentials grants
- Token introspection for services
- Basic Resource Server functionality with implicit and explicit ACLs
- Customizable web interface


Standards Implemented
---------------------

The specific standards mOAuth currently implements are:

- [The OAuth2 Authentication Framework (RFC6749)](https://tools.ietf.org/html/rfc6749)
- [The OAuth2 Bearer Token (RFC6750)](https://tools.ietf.org/html/rfc6750)
- [OAuth 2.0 Dynamic Client Registration Protocol (RFC7591)](https://tools.ietf.org/html/rfc7591)
- [Proof Key for Code Exchange by OAuth Public Clients (RFC7636)](https://tools.ietf.org/html/rfc7636)
- [OAuth 2.0 Token Introspection (RFC7662)](https://tools.ietf.org/html/rfc7662)
- [OAuth 2.0 for Native Apps (RFC8252)](https://tools.ietf.org/html/rfc8252)
- [OAuth 2.0 Authorization Server Metadata (RFC8414)](https://tools.ietf.org/html/rfc8414)
