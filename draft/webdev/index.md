
## Introduction

## Preparation
* Operating system
* Developer tools

## Internet theory
* Some vocabulary
* Web and other development platforms 
* Internet and the web
* Architecture of a web application
* The HTTP protocol

## Basics
* HTML
* CSS

## Intermediate  
* Javascript
* jQuery & The DOM

## Advanced
* NodeJS
* ES6 & Webpack
* React  

## Deployment
* Netlify
* Digital Ocean

## Other
* Backend



## Introduction

Hi. My name is Julien and I am the creator of EatTheBlocks.
On my channel, I teach mainly Ethereum Dapp and Solidity smart contract development

Blockchain is built on the web and you do need to have some basic
skills in web development in order to understand blockchain and develop decentralized applications.

However, I realized that many of my students either:
* Don't have any background in programming
* Or, they are already experienced programmers, but not in the field of web development.

If you are in one of these categories, don't start to jump into blockchain right away,
you will struggle. 

Instead, take the time follow this course that I created just for you. 

It will teach you the basics of web development: Html, css, Javascript and React.
You learn how to combine these technologies to create modern web applications,
with nice-looking user interface.

After this course, you will be able to use these skills as solid foundations to continue your
journey to becoming a blockchain developer.

This is not a comprehensive training on all the aspects of web development.
I only included the bare minimum that you need in order to survive as a blockchain developer. 
So you won't waste your time with this course, it goes straight to the point.

## Preparation
 
* Operating system
* Developer tools

### Operating system

In this section, we will understand a couple of questions:

* What's the best operating system for web development?
* Is my operating system compatible with this course

For the first question, it's difficult to give an exact answer, but generally
speaking a lot of web developer tools were developed on Linux. Linux
does not designate any specific operating systems, but it's a base that
is used by several operating systems, such as Ubuntu and Mac. Just to be
clear, Windows is NOT a Linux operating system. So it's better if you are on
Ubuntu and Mac. Personally, I used to be on windows, then switched to
Ubuntu, then switched to Mac. In the end, I am very happy with my Mac, as
it combine the benefits of having a polished "home" while being very
compatible with Linux.

This being said, don't panick if you are on Windows. More on that below.

For the second question, actually, after the previous answer, we can reformulate
the question and ask;

"Is it ok to follow this course on Windows?"

If you have Windows 8 or above, you shouldn't have any problem. We will use
NodeJS, which works well both on Windows and Linux machines. 
The only potential small issue that could arise is when I will give you bash-specific
instructions for the command-line. But I will guide you to figure out
what will be different for you. Also, it's worth noting that nowadays
Windows has made a lot of progress to be compatible with Linux systems. 

### Developer tools

We will need these tools:

* [Required] Google chrome
* [Required] NodeJS
* [Required] Code editor
* [Required] Command line
* [Optional] git 

For Google chrome, I am going to assume you already have it. If you don't and use
Firefox for example, you can still follow the course, but be aware that I will
give instructions using the Google developer console of Chrome. It's up to
you to figure out how to use the equivalent in Firefox.

For NodeJS, Go to the website of [Nodejs](https://nodejs.org) and click
on the button to install the LTS version. LTS stands for "Long-term support"
and that is the recommended version for most users. Currently, the major
version number is 10. If you already have NodeJS installed, make sure to
upgrade to version 10 if you have an older version, or use a tool like 
[nvm](https://github.com/nvm-sh/nvm) to manage multiple versions side by side.

For the code editor, this will be used to edit the HTML/css/Javascript code
of your web applications. Don't use a text editor like Words or Pages. These
code editors for normal documents add a lot of non-visible characters
and don't have syntax highlighting. In a nutshell, they are not designed for
code editing. Instead, use a proper code editor.

There are 3 kind of code editors:

* IDE (Integrated Development Environment)
* Simple code editors
* Modal code editors

IDEs are software like Eclipse, Visual Studio, xcode, etc... They  are very powerful, 
but are sometime a bit bloated and slow. You might not need all the tools they offer, 
and you be turned off by their complexity. I don't recommend them.

Simple code editors are software like Visual Studio Code (note the extra "Code"
compared to "Visual Code"), atom, etc... 
Like their name imply, wait for it... simple! 
Their core feature is code editing / syntax highlighting, and that's it. 
However, many of them are very customizable with a variety of plugins. 
With enough patience, you can recreate your custom IDE, but without the bloat 
and the slow speed. I recommend you to pick a code editor like this, and more
specifically Visual Studio Code is by far the most popular.

Finally, there is the category of modal code editors, represented mainly
by the venerables Vim and Emacs. These code editors are a world of their own. 
They main differentiator is that they are ultra-configurable and can be used
with only your keyboard, no mouse needed. They can offer some nice productivity
gains and improved ergonomics (no mouse = no strain on your wrist), but they
come at the cost of a steep learning curve. I definetly don't recommend them
for beginners. Once you feel comfortable in web develepement and want a new
  challenge, you can revisit this question and give a try to Vim or Emacs.

For the command-line, I will give instructions compatible with bash terminals.
If you are on Mac on Linux, you should have a bash terminal installed already.
If you are on Windows, you can install [Git for Windows](https://git-scm.com/download/win).
It will install both Git and an emulation of Bash. This won't be exactly
like the real bash, but for our intent and purposes it will be enough.

## Internet theory


### Some vocabulary

In this section, I defined some words that we will often in this course.
You don't have to memorize them know, as we will.
but in case you are confused at any time during this course, 
you can come back to this section for a reminder of which word means what.

* Frontend, a.k.a client: The part of a web application that send requests. Usually a web browser / mobile
* Backend, a.k.a server: The part of a web application that receive requests. Invisible to end-users.  
* Protocol: a way to manage communication between 2 different entities 
* HTTP: Hyper Text Transfer Protocol. The main protocol of the web
* Web: Internet with the HTTP protocol
* Website: An set of document (html, css and Javascript) that can be loaded
from an address on the web
* Web application: Like a website, but with generally more complex, with dynamic dataan application built on the about

### Web vs other development platforms

When you work as a software developer, there are several ways to define yourself:

* The platform you develop software for: web, desktop, mobile, embedded, etc...
* The language you use: C/C++, Java, Javasript, Python, etc...
* The kind of company you work: startup, corporate
* The industry you work in: finance, energy, elearning, ecommerce, etc... 

For this course, our platform will be the web, and our language will be Javascript
Of course we will also use HTML and CSS, but there are not really programming language.
So after you follow this course, when you present yourself you can say

"I am a web developer".

Out of all the development platform, the web is by far the dominant platform.
Most developer jobs are for the web platform. 
What is rven

### Internet and the web 

The internet is a network of computers that are connected to each other.
Computers belongs either to individuals, like my computer or your computer,
to companies like Facebook or Google, to governments or other organizations.

On the internet, we communicate using what we call protocols. Protocol
are pre-established ways of managing a communication. For example, in a classroom
the protocol is that the teacher speak, and if a student wants to interrupt,
he or she has to raise its hand, and the teacher decide whether or not
to give the floor to the student.

The internet uses several protocol, like ftp to transfer files, udp for voice
messaging, but the most used by far is the http protocol. The http protocol is
used for loading websites like wikipedia, or google. 

So what is the difference between internet and the web? When we talk of the internet,
we mean the underlying infrastructure that allow all the computers to communicate.
As a web developer, we pretty much never to worry about this infrastructure.
We just assume it works.

As for the web, it means using the internet with the http protocol to run websites.
Most people use internet for websites, so internet and the web have become
almost synonymous, but they are not the same thing.

### HTTP protocol

The protocol used for loading websites is HTTP. 
You don't need to deal with low-level details of HTTP in your day-to-day
tasks of web developer, but it's useful to know the big ideas so that you can
debug and design more easily your web applications.

The HTTP protocol is described in a long document of 1000 pages, and
we need to understand every single page before we continue.

Let's start with page 1.

haha, just kidding!

The basic idea of HTTP is that 
* client request data from servers
* servers respond to requests in response messages. 

These messages have 3 parts:

* Start line: 
* HTTP headers
* HTTP Body

The start line specifies:

* the version number of the HTTP protocol
* the HTTP verb
* the URL
* the response code, if this is a response

For the version number, it's always going to be 1.1. And now HTTP 2 start to be
rolled out. You can ignore this.

The HTTP verb tells you what type is the message. There are many HTTP verbs
defined in the HTTP specification, but in practise only 2 are used:

* GET
* POST

GET requests are for getting ressources, like an image, or a css stylesheet.
We only request to get these resources, but we don't modify anyhthing.

POST requests are for creating new data or modifying existing data. For example, when you
create a new message on facebook, you will use a POST message.

Finally, for the URL, it specifies the location of the server and the resources
to target. For example facebook.com/images/beach.png means that the
server is located at address facebook.com, and we want the resource
`images/beach.png`.

Finally, for the response codes (only if http is a response of course),
there are many possibilities but these one are the most usual:

* 200: ok, request was processed normally
* 201: resource created (when you create a post for example)
* 301/302: redirection
* 404: not found (you probably know this one!)
* 401: Not authorized (login problems..)
* 500: server error (houston, we have a problem...) 

That's it for the HTTP start line. What about the remaining 2 elements of an HTTP
request, i.e HTTP headers and the body?

HTTP headers add more information to the initial request. For example, you
can specify the data format that you are expecting in response (ex:
HTML, png, json...).

As for the HTTP body, that's where you will put the actual payload of your
message, like the new data if you are updating something.

### Architecture of a web application

Let's assume that you are sitting in front of your computer.
You decide to load your favorite website, like pornhub, uhh... oops, 
no I mean... wikipedia of course.

You type wikipedia.org in your browser, press enter, and miracously the webpage of
google appears. What happened there?

Quite a lot. Let's break it down.

First, let's start with the 2 parts of a web application:

* The server (also called backend)
* The client (also called frontend)

There were 2 parts to the process:

* The request, from the client to the server
* The response, from the server to the client

First, the request. After you typed wikipedia.org and pressed enter, 
your browser sent an HTTP request to the server of wikipedia.org 
(I am skipping DNS resolution here).:

```
HTTP 1.1 GET wikpedia.org
```

Then, after your server receives this request, it's time for the response
phase. The send back to the client (i.e your browser) a document called
an HTML page. This is a structured piece of document that your browser 
will use to display visually the website.

You probably guess that understanding how this HTML thing work is key. Well,
rejoice because it's what we will do in the next section.

## Basics

### HTML

#### Basics

A HTML document is a tree-like data structures of HTML nodes. Each node
represent an element of the webpage.

If you click on right-click "Inspect HTML source" in chrome, you will be able
to see HTML of any webpage. The HTML of a random webpage will probably a bit
complex, but that's ok, nobody is supposed to make sense of a random
HTML page.

Here is a simple HTML document:

```
<html>
  <head>
    <!-- I a comment, ignored by browsers -->
    <link rel="stylesheet" type="text/css" href="mystyle.css">
  </head>
  <body>
    <p>I am a paragraph</p>
  </body>
</html>
```
The top-most node is the `<html>` node. Its 2 children are `<head>` and `<body`>,
which themselves have other children, etc. At the bare minimum, you need to
have the `<html>`, `<head>`, and `<body`> nodes.

`<head>` is for defining css stylesheet (to style your webpage) and some meta information.
`<body>` is for placing everything else. Most of your html will be inside
`<body>` tags.

Some nodes are visible by the user, and some are not. 
For example, this is a paragraph with text (visible):

```
<p>I am a paragraph</p>
```

And this gives a meta information on the webpage (not visible):

```
<meta charset="UTF-8">
```

Node is a term we use when talking of data structures, but in an HTML document
nodes are represented by tags (`<html>`, `<body>`, etc...), so from now on we will 
talk in terms of tags.

#### Tags structure

Tags have 2 types of data:

* attributes
* children

Attributes are meta information that we attach to a tag.
They are especially useful when you want to style a tag with css. 
Children are like the value or payload of a node.

Below is an example of a tag with an attribute `class` that has a value `post`,
and a text child `I am a paragraph`:

<p class="post">I am a paragpag</p>

Tags can be nested:

```
<p>I am <strong>20 years old</strong></p>
```

Most tags come in pairs. But some are single. In any case, all must be 
closed by a `/>`:

```
<span>Hello!</span>
<img src="src/to/image.jpg" />
```

#### Most used tags

The main tags you use for user interfaces are:

* `<div>`
* `<p>`
* `<span>`
* `<img>` 

`<div>` tags are used to create group of HTML tags that go together. For
example, if you have a section "testimonial" on a landing page, you could
wrap it with a `<div>`.

`<p>` tags are used to wrap paragraph of text.

`<span>` are for group of words / sentence.

`<img>` are for images

This is an exemple of how to combine all these tags:

```
<html>
  <head></head>
  <body>
    <div>
      <p>I am a <span>paragraph</span></p>
      <img src="path/to/my/image.png"/>
    </div>
  </body>
</html>
```

### CSS

#### Basics

CSS is used for styling webpages. CSS works hand-in-hand with HTML. Generally,
we build the HTML at the same time as we build the CSS.

The 3 fundamental of CSS are:

* declarations
* selectors
* rules

Declarations specify which visual effect you want to apply.
Selectors target specific HTML element(s).
Rules combine selectors and declarations: such visual effects will apply
to such elements.

For example. in the below rule, the selector is `p`, and the declaration is 
`color: white`.

```
p {
  color: white;
}
```

#### Selectors 

There are different kind of selectors:

* tag-based selector
* id-based selector
* class-based selector

tag-based selectors can select one or many HTML elements, based on the nature
of the tag. For example, the `p` selector selects ALL `p` HTML elements.

id-based selector are selectors that are used to select only 1 HTML element.
They work with HTML id attributes. You can add an id attribute with on any
HTML tag, but the value you give them must be unique:

OK:

```
<div id="section1">...</div>
<div id="section2">...</div>
```

NOT OK (too id's with same value):

```
<div id="section1">...</div>
<div id="section2">...</div>
```

if you wan to select the `<div>` with id `section1`, you need to use this selector,
with the `#` sign::

```
#section1 { }
```

If you wanted to select `section2`, you would use this selector instead:

```
#section2 { }
```

I think you got the idea.

And finally, we have class-based selector, to select a group of tags. Classes
are attributes that you can add to any HTML tags, like ids. However, unlike
ids, several HTML tags can share the same class:

```
<div class="section1">...</div>
<div class="section1">...</div>
```
Also, contrary to id's, you can assign several classes to a single HTML tag:

```
<div class="foo bar">...</div>
```

If you want to select all tags with the class `section1`, you use this selector:

```
.section1 { }
```

So we have all these selectors to choose choose from. 
That's great, but... how to pick the right one?
Generally, you want to use a selector as specific as possible. 
If you use a selector too broad, you risk creating a CSS rule that will apply 
to too many elements, and will mess up the styling somewhere.

#### Important rule

The !important rule

#### Debugging CSS


## Intermediate

### Javascript

#### Introduction

Javascript was created in the 90's at Netscape, the ancestor of Mozilla.
It was originally used as a toy language to create some flashy website animations.
Fast-forward in 2019, its role has now expanded to make complex web applications.

By the way, don't be confused with Java. The name proximity is an accident,
and they are 2 totally different language.

Javascript is a dynamic language, which means it does not need any compilation
step. You just write the code, and you can run it right away. That is
different from languages like C or C++ where you do need to compile your code
first before you can run it.

Javascript is used mostly to build the frontend of web applications. i
It's actually the only language that you can use to build web frontends. 

#### Javascript basics

Like many other languages, Javascript follows the syntax of C. I am just going
to assume that you know C and not explain further... haha, very funny Julien...
Ok ok, I will explain :)

Javascript has 3 kind of constructs:

* Variables
* Functions (also called methods when attached to objects)
* Objects

The idea is that you put data in your variables, and you manipulate then with
functions or objects. For example, if you want to add 2 numbers, you define
2 variables to represent the 2 numbers, and a function to add them.

When you write Javascript, you put your code into file that ends with `.js`,
like `myCode.js`.

Your can terminate your code with semi-colos (`;`), but you don't have too.
It's better to stick to a single style.

All the code in a file is evaluated from top to bottom. 

Everything inside comments is ignored:

```
// Single-line comments
/*
 * Multi-line comments
 *
 */
```

#### Javascript variables

In Javascript, you will use variables to put your data. A variable has 3
elements:

* a name
* a value - what is actually stored (ex: 2)
* a type - defines the category of the data (ex: number).

There are 5 main types in Javascript:

* Strings
* Numbers
* Booleans
* Arrays
* Objects

When you declare a variable, you don't need to declare the type. The Javascript
compiler will automatically infer the type based on the value you provide.

When you declare a variable, you need to use: 
* the `var` keyword (yes var is bad and should be avoided, but we will see this in next chapter on ES6), 
* the name of the variable
* the value of the variable

```
var name = 'Paul';
var a = 1;
var isValid = true;
var ages = [10, 20, 30];
var person = {
  name: 'Jake',
  age: 10
};
```  

#### Strings

Strings can be defined with single or double quotes:

```
var firstName = 'Paul';
var lastName = 'White';
```

These are frequent operations with strings:

* concatenation (put several strings
* check if a string includes another one
* determine length of string
* Extract part of strings

To concatenate strings, use the `+` operator:

```
var fullName = firstName + lastName;
```

To check if a string includes another one, use the `includes()` method:

```
fullName.includes('Pa') // returns true
fullName.includes('Jay-Z') // returns false
```

To determine the length of a string, use the `length()` method:

```
firstName.length(); // returns 4
```

To extract a part of a string, use the `slice()` method:

```
firstName.slice(0, 2); // Extract Pau from the string, i.e remove it from string, and return it
```

#### Numbers

Numbers can represent both integers or decimal-point numbers. Generally, it's
better to avoid decimal-point numbers, because they can cause some rounding
errors and all sort of headaches.

These are frequent operations for numbers:

* arithmethic operations
* find max/min
* parse a string into a number

For arithmetic operations:

```
a + b; //Addition
a - b; //substraction
a / b //division
a * b //multiplication
a ^ b //Power
```

Find min/max:

```
Maths.min(a, b);
Maths.max(a. b);
```

Parse a string into a number. You will have to do this if you receive some
number from an API, and need to do some operations on the number:

```
var a = '10';
a = parseInt(a); //now a is a number
```

#### Booleans 

Boolean types can model simple binary data that can have 2 values, 
like "is active?", "is valid", etc...  

Boolean types can have 2 values in Javascript:

* true
* false

We use the `true` / `false` keyword

```
var iamTrue = true;
var iamFalse = false;
```

These are the most common operations on boolean variables:
  
* logical and (between 2 variables - means "are both variables true?")
* logical or (between 2 variables - means "is either variable true?")
* logical not (means "the contrary of the variable")
* logical arbitrary comparison 

To do a logical and, you use the `&&` operator:

```
var a = true;
var b = false;
var result = a && b; //result is false 

var a = true;
var b = true;
var result = a && b; //result is true 
``` 

To do a logical not, you use the 

```
var a = true;
var b = false;
var result a || b; //result is true

var a = false;
var b = false;
var result a || b; //result is false
```

```
var result = !a
```

#### Arrays

Arrays are container which can store several piece of data under a single 
variable names. A bit like a drawer can hold several socks. 

Arrays have:

* Entries (~values)
* Length

For example, if an array has 2 entries, its length is 2.

Each entry has 2 elements:

* an index
* a value

The value is the actual data, and the index allows to find the entry in the
array, a bit like a street number in an address.

These are frequent operations with arrays:

* Declare an empty array
* Add entry
* Access element at index
* Get the length of an array
* Find the index of an entry
* Iterate through array

To declare an empty array, you use the square bracket notations:

```
var ages = [];
```

To add an entry, you use the `push()` method:

```
ages.push(20); // Will be added at end of array
```

To access an element an index `i`, you use this notation:

```
ages[2] //This is 0-indexed, means index 2 actually us 3rd entry, not 2nd
        //If index is bigger that largest index, it will produce an error
```

To get the length of an array, you use the `indexOf()` method:

```
ages.length()
```

To find the index of an entry, you use the `indexOf()` method:

```
ages.indexOf(10) //Will return index of 10 if inside array, -1 otherwise
```

To iterate through an array, you use a for-loop (see later section for how 
loop work):

```
var i = 0;
for(var i = 0; i < ages.length; i++) {
  ages[i]; //do something with each entry
}
```

There are also more modern ways like using the forEach method:

```
ages.forEach(function(age) {
  //do something with age
});
```


### Objects


### function

Functions allow to group together several lines of code. A bit like a recipe.
It's a good practice to keep your functions small and coherent.
If you cannot describe your function simply, it probably means they are too
big.
Usually, the code contained these lines form a coherent functionality.

```
function add(a, b) {
}
```


#### Comparisons & If statmeents

If statements allow to execute a piece of code only if a certain condition
is met. There are widely used in Javascript programs.

```
var isValid = true;
if(isValiud
```

By the way, it's a bad practise to use deeply nested if-statements. So,
refrain from doing this, unless there is not other way.

#### Ternary operators

If statements can be a bit verbose in some situations. Ternary operators
do the same thing as if-statements, except that the syntax is more terse.
  
``` 
var a = true;
var b = false;
var isValid = a === b ? true : false;
```
  
#### Switch statements

For complex if-

#### For loops



#### How to name variables, functions and classes?

For variables, use nouns. Preferrably, short names. Long names increase the
cognitive loads and make it hard to reason about the code. Try to be specific
with name. For example `data` is a bad variable name.
For functions, use action verbs, optionally followed by a name. Ex:
`updateUser()`, `loadPrices()`, etc...



## NodeJS

In the last section, we learned about Javascript.
Although Javascript was first developed for the frontend in web browsers, 
it can also be used server-side with a project called NodeJS.

NodeJS was de

Javascript Before, we learned about Javascript. 
