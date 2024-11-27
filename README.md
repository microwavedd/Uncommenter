A npm package that removes every comment from any given script, no matter the language.

IT IS A CLI (Command Line Interface), and uses the "uc" command.

To use this package correctly, you must go to the directory where the files's comments you want to delete reside and use either "uc file.extension" or "uc .".
The first command will delete the comments of any given file, depending on the extension (Python, C++...). This means that the package will detect different symbols as comments based on the file extension. 
For instance, if the file extension is .py, the package will obiterate any "#" present on the file, but if the file extension is .js, the package will remove any "//" it finds.
The second command (uc .) will delete the comments of every single file in the directory you are inside of. As previously mentioned, it first detects the file extension to know what type of comment the language uses. 

AFTER YOU DOWNLOAD THE NPM PACKAGE, in case you want to use it everywhere on your machine, you must do "npm link" in the root directory of the package.

Enjoy!
