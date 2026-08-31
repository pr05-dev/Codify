export interface VisualNode {
  id: string;
  label: string;
  sub: string;
  highlight?: boolean;
}

export interface CodePathTopic {
  id: string;
  title: string;
  theory: {
    analogy: string;
    why: string;
    when: string;
    visual: {
      title: string;
      description: string;
      diagramType: 'container' | 'grid' | 'flow' | 'table';
      nodes: VisualNode[];
    };
    explanation: string;
    internalWorking: string;
    stepByStepCode: Array<{ line: string; comment: string }>;
    commonMistakes: Array<{ mistake: string; fix: string; explanation: string }>;
    beginnerTips: string[];
    memoryTrick: string;
  };
  practice: {
    hint: string;
    mcq: {
      question: string;
      options: string[];
      correctAnswer: number;
      explanation: string;
    };
    fillInBlanks: {
      question: string;
      blankWord: string;
      explanation: string;
    };
    predictOutput: {
      code: string;
      question: string;
      expectedAnswer: string;
      explanation: string;
    };
    errorIdentification: {
      code: string;
      bug: string;
      fix: string;
      explanation: string;
    };
    miniExercise: {
      instruction: string;
      starterCode: string;
      sampleSolution: string;
      testInput?: string;
    };
  };
}

export const TOPICS_LIST = [
  "Introduction",
  "Installation & Setup",
  "Variables",
  "Data Types",
  "Operators",
  "Input / Output",
  "Conditions",
  "Loops",
  "Functions"
];

export const CODEPATH_CURRICULUM: Record<string, CodePathTopic[]> = {
  python: [
    {
      id: "intro",
      title: "1. Introduction to Python",
      theory: {
        analogy: "Writing Python is like giving recipe instructions to a helper who speaks plain English. Python has very little boilerplate—it reads like simplified English notes.",
        why: "To convert human intentions into machine instructions with minimal syntax noise, enabling super-fast prototyping.",
        when: "Use it for scripting, data analysis, build automation, AI training, or general-purpose application development where developer velocity is critical.",
        visual: {
          title: "Translation Loop",
          description: "Python runs via an interpreter which parses line-by-line",
          diagramType: "flow",
          nodes: [
            { id: "1", label: "Your Code (.py)", sub: "print('Hello')", highlight: true },
            { id: "2", label: "Python Interpreter", sub: "Translates dynamically", highlight: false },
            { id: "3", label: "CPU executes", sub: "Instant machine output", highlight: true }
          ]
        },
        explanation: "Python is a high-level dynamically typed language. Unlike compiler-heavy languages, it executes your text file list directly using an interactive interpreter.",
        internalWorking: "The interpreter compiles Python code into intermediate 'bytecode' (.pyc), which is then run on the Python Virtual Machine (PVM).",
        stepByStepCode: [
          { line: "print('Hello, World!')", comment: "Built-in command to output a string to the system standard output" }
        ],
        commonMistakes: [
          { mistake: "Mixing spaces and tabs", fix: "Always use standard 4 spaces for nested scopes", explanation: "Python counts whitespaces to define code blocks." }
        ],
        beginnerTips: ["Don't worry about semicolons or curly braces!", "Think of it as structured pseudocode."],
        memoryTrick: "Py-Thon: Sounds like 'plain' + 'speak', quick to write, quick to seek."
      },
      practice: {
        hint: "We print things out by calling the print() function.",
        mcq: {
          question: "Which feature distinguishes Python from languages like Java or C++?",
          options: [
            "It doesn't support functions",
            "It uses mandatory indentation to define blocks instead of curly braces",
            "It cannot store numbers",
            "It runs directly on pure silicon without software translation"
          ],
          correctAnswer: 1,
          explanation: "Python uses strict indentation (standard 4 spaces) to define code hierarchies, making curly braces unnecessary."
        },
        fillInBlanks: {
          question: "To display output in Python, we call the ______('text') function.",
          blankWord: "print",
          explanation: "The print() function sends textual messages to the user console."
        },
        predictOutput: {
          code: "print('Hello')\nprint('World')",
          question: "What is output?",
          expectedAnswer: "Hello\nWorld",
          explanation: "Each print() statement in Python introduces a newline at the end of the text."
        },
        errorIdentification: {
          code: "Print('Python from scratch!')",
          bug: "Capitalized 'P' in print func.",
          fix: "print('Python from scratch!')",
          explanation: "Python is case-sensitive. 'print' and 'Print' are entirely different entities to the interpreter."
        },
        miniExercise: {
          instruction: "Write a command that displays the number 100 on the screen.",
          starterCode: "# Your code here",
          sampleSolution: "print(100)"
        }
      }
    },
    {
      id: "setup",
      title: "2. Installation & Setup",
      theory: {
        analogy: "Installing Python is like setting up a chef's cooking bench. You need to gather the actual ingredients toolkit (Python runtime) and the smart recipe book editor (VS Code, IDLE, or Cursor).",
        why: "Your Operating System natively understands machine language. We must install the interpreter translator so it compiles your instructions.",
        when: "Always do this once on your developer machine before running or publishing Python projects.",
        visual: {
          title: "Setup Architecture",
          description: "Development environment connectivity diagram",
          diagramType: "grid",
          nodes: [
            { id: "1", label: "VS Code Editor", sub: "Writes code letters", highlight: true },
            { id: "2", label: "System PATH Hook", sub: "Links code command line", highlight: false },
            { id: "3", label: "Python 3.x Engine", sub: "Translates and executes", highlight: true }
          ]
        },
        explanation: "To code in Python, download the official installer. Enable the 'Add python.exe to PATH' option during installation! This allows commands like `python` to work inside terminal windows.",
        internalWorking: "PATH is an environment variable telling the OS where to find execution toolkits when a command is typed.",
        stepByStepCode: [
          { line: "python --version", comment: "Command line command to test if interpreter is mounted on your machine" }
        ],
        commonMistakes: [
          { mistake: "Forgetting to check 'Add to PATH'", fix: "Rerun installer, select 'Modify', check the PATH box", explanation: "Without this, your terminal will say 'python command not found'." }
        ],
        beginnerTips: ["Use VS Code with the official Python extension", "Ensure you use Python 3, not the obsolete Python 2."],
        memoryTrick: "PATH is the compass. No PATH, no Python found!"
      },
      practice: {
        hint: "We verify system installation by asking the interpreter for its version.",
        mcq: {
          question: "Why should you select 'Add Python to PATH' during Windows installation?",
          options: [
            "To make your computer boot faster",
            "To enable using the python command inside any terminal window",
            "To download pre-made website themes",
            "To unlock internet browser functions"
          ],
          correctAnswer: 1,
          explanation: "The PATH environment variable allows the terminal shell to locate and call python.exe from any folder."
        },
        fillInBlanks: {
          question: "The standard tool to install Python libraries is called ______.",
          blankWord: "pip",
          explanation: "pip is Python's package installer, used to pull modules from the Python Package Index (PyPI)."
        },
        predictOutput: {
          code: "# Command Line output example\n# Input: python -V\n# Output: Python 3.11.0",
          question: "What version prefix represents modern standard Python?",
          expectedAnswer: "3",
          explanation: "All modern development happens in Python 3.x."
        },
        errorIdentification: {
          code: "$ pyton --version",
          bug: "Mispelled 'python' in execution search.",
          fix: "python --version",
          explanation: "Command spells must align perfectly for command-line lookup engines."
        },
        miniExercise: {
          instruction: "Write a mock console run statement executing a script named 'app.py'.",
          starterCode: "# Terminal command block",
          sampleSolution: "python app.py"
        }
      }
    },
    {
      id: "variables",
      title: "3. Variables (The Box Model)",
      theory: {
        analogy: "Imagine a physical cardboard box with a sticky label called 'wallet'. When you open it, inside is a paper banknote worth 50 dollars. You can swap that banknote for a 10 dollar bill. The label 'wallet' is still the same, but the inside content has changed.",
        why: "Computers have billions of temporary storage units (RAM cells). Instead of memorizing raw hardware memory addresses (like 0x7FFA89B0), variable names act as human-friendly labels for those locations.",
        when: "Use variables whenever you need to capture user input, track score counts, or preserve states dynamically.",
        visual: {
          title: "Memory Box representation",
          description: "Pointer mapping in memory blocks",
          diagramType: "container",
          nodes: [
            { id: "lbl", label: "Label: 'wallet'", sub: "Variable reference name", highlight: true },
            { id: "val", label: "Contents: 50", sub: "Value inside standard storage box", highlight: false },
            { id: "adr", label: "RAM address: 0x4f12", sub: "Actual physics location", highlight: false }
          ]
        },
        explanation: "Declaring variables in Python is direct. Choose a clean snake_case label name, use the '=' assignment sign, and input the target value.",
        internalWorking: "Python variables are pointers to memory objects. Assigning values updates the pointer address inside our system map.",
        stepByStepCode: [
          { line: "score = 10", comment: "Allocates integer object 10, links the label 'score' to it" },
          { line: "score = score + 5", comment: "Fetches current content (10), increments, then links 'score' to new integer 15" }
        ],
        commonMistakes: [
          { mistake: "Using variable name before creating it", fix: "Always declare the variable first: score = 0", explanation: "Accessing non-existent variables triggers a NameError." }
        ],
        beginnerTips: ["Use descriptive titles (e.g., dynamic_user_count rather than simple 'x')", "Keep names lowercase with underscores."],
        memoryTrick: "Variables hold values. Just like boxes holding shoes."
      },
      practice: {
        hint: "We use a single equals sign '=' to assign values.",
        mcq: {
          question: "What does the single '=' operator do in Python?",
          options: [
            "Compares if two items are equal",
            "Creates a duplicate name",
            "Assigns the value on the right to the variable on the left",
            "Calculates the remainder of a division"
          ],
          correctAnswer: 2,
          explanation: "The '=' sign establishes an assignment connection, binding values to names."
        },
        fillInBlanks: {
          question: "Creating x = 5 and then doing x = 12 means x now stores ______.",
          blankWord: "12",
          explanation: "Reassignment overrides previous box values instantly."
        },
        predictOutput: {
          code: "a = 5\nb = a\na = 10\nprint(b)",
          question: "What is stored in b?",
          expectedAnswer: "5",
          explanation: "b was bound to the value 5 at step 2. Changing 'a' afterward doesn't rewrite b's target value automatically."
        },
        errorIdentification: {
          code: "1st_place_score = 99",
          bug: "Variables cannot start with numbers.",
          fix: "first_place_score = 99",
          explanation: "Identifiers must start with a letter or underscore, not a numeric digit."
        },
        miniExercise: {
          instruction: "Declare a variable named score and assign it the number 10.",
          starterCode: "",
          sampleSolution: "score = 10"
        }
      }
    },
    {
      id: "datatypes",
      title: "4. Data Types (Understanding Shapes)",
      theory: {
        analogy: "Think of cookie cutters. You cannot pour warm milk into a star-shaped cookie cutter to store it; milk needs a cup. Similarly, numbers are treated differently from alphabetic strings or True/False signals because they have different shapes and operations (you can multiply numbers but not words).",
        why: "To tell the hardware how much memory to reserve and what operations are valid on that variable shape.",
        when: "Always think of data types when capturing keyboard inputs (ints vs strings) to avoid math errors.",
        visual: {
          title: "Shape Categorization",
          description: "Four elementary types in Python",
          diagramType: "grid",
          nodes: [
            { id: "str", label: "str (String)", sub: "'Python' - Text", highlight: true },
            { id: "int", label: "int (Integer)", sub: "42 - Wholenumber", highlight: false },
            { id: "flt", label: "float (Decimal)", sub: "3.14 - Fractions", highlight: false },
            { id: "bln", label: "bool (Boolean)", sub: "True / False", highlight: true }
          ]
        },
        explanation: "Python auto-detects shapes! If wrapped in quotes, it's a string. If write integers, it's an int. If add periods, it's a float. Capitalized True or False makes it a boolean helper.",
        internalWorking: "Dynamic typing makes Python inspect objects at runtime to attach functional methods dynamically.",
        stepByStepCode: [
          { line: "age = 20", comment: "This is classified as an 'int' type" },
          { line: "price = 19.99", comment: "Since there's a period, it's a 'float' type" },
          { line: "name = 'Code'", comment: "Wrapped in single quotes, so is standard 'str' type" }
        ],
        commonMistakes: [
          { mistake: "Trying to add string and integer: '5' + 5", fix: "Convert first: int('5') + 5", explanation: "Python forbids implicit string-number addition to prevent safety bugs." }
        ],
        beginnerTips: ["Use type(variable_name) to inspect its shape at any time", "Booleans must start with capitals: True or False."],
        memoryTrick: "Ints are integers. Floats have decimal floats. Strings are literal characters threaded together."
      },
      practice: {
        hint: "Wrapped phrases inside individual quotes represent strings.",
        mcq: {
          question: "Which of the following belongs to the 'float' data type?",
          options: [
            "\"100\"",
            "100",
            "100.0",
            "True"
          ],
          correctAnswer: 2,
          explanation: "Any numbers carrying double or single-bracket decimal periods represent float types."
        },
        fillInBlanks: {
          question: "The function type('false') returns class ______.",
          blankWord: "str",
          explanation: "'false' is written inside quotes, rendering it a text string, not a boolean constant."
        },
        predictOutput: {
          code: "x = 10\ny = '5'\nprint(type(x) == type(y))",
          question: "What does this output?",
          expectedAnswer: "False",
          explanation: "type(x) is <class 'int'>, while type(y) is <class 'str'>, which are not identical pointers."
        },
        errorIdentification: {
          code: "age = 25\nprint('Age: ' + age)",
          bug: "Cannot concatenate string and int.",
          fix: "print('Age: ' + str(age))",
          explanation: "Python prevents automated type stitching. Wrap your numerical objects in str() converters."
        },
        miniExercise: {
          instruction: "Declare a float variable named gravity with value 9.81.",
          starterCode: "",
          sampleSolution: "gravity = 9.81"
        }
      }
    },
    {
      id: "operators",
      title: "5. Operators (The Machine Gears)",
      theory: {
        analogy: "Operators are like physical functional buttons inside a manual desk calculator. Addition buttons join quantities. Modulo buttons (%) calculate remainder fragments when dividing pieces.",
        why: "To perform logic operations, mathematical additions, and comparisons on system datasets.",
        when: "Whenever you calculate percentages, check scores, or verify if a number is even or odd.",
        visual: {
          title: "Math vs Logic Gears",
          description: "Common core operator symbols",
          diagramType: "table",
          nodes: [
            { id: "mod", label: "% Modulo", sub: "Remainder of division (e.g. 5 % 2 = 1)", highlight: true },
            { id: "eq", label: "== Equals Comparer", sub: "Checks equality of values", highlight: false },
            { id: "and", label: "and Logic", sub: "True if both sides are True", highlight: true }
          ]
        },
        explanation: "Arithmetic utilizes normal signs: +, -, *, /. Division `/` always returns a float decimal. Use `//` for whole integer divisions and `%` for remainder outputs.",
        internalWorking: "Computer processors have arithmetic logic units (ALU) that perform logic bitwise operations instantly.",
        stepByStepCode: [
          { line: "remainder = 13 % 5", comment: "Divides 13 by 5 (goes twice, remainder 3), remainder gets 3" },
          { line: "is_equal = (10 == 10)", comment: "Validates equality, returns True boolean to is_equal" }
        ],
        commonMistakes: [
          { mistake: "Using single '=' instead of double '==' for matching evaluation", fix: "if status == 'active':", explanation: "A single '=' is used only to write value assignments. Double '==' performs checks." }
        ],
        beginnerTips: ["Use % 2 to verify if values are even; even outputs equal 0", "Use parentheses to organize complex sequences."],
        memoryTrick: "% stands for the 'percentage remainder' leftovers."
      },
      practice: {
        hint: "Modulo '%' yields the fractional remainder of integer division.",
        mcq: {
          question: "What is the evaluated output of 15 % 4?",
          options: [
            "3.75",
            "3",
            "2",
            "1"
          ],
          correctAnswer: 1,
          explanation: "4 goes into 15 three times (12), leaving a remainder of 3."
        },
        fillInBlanks: {
          question: "To perform integer division (floor division) in Python, we use the ______ symbol.",
          blankWord: "//",
          explanation: "Double lines // drop fractional digits, returning raw base whole numbers."
        },
        predictOutput: {
          code: "x = 10\ny = 3\nprint(x // y)",
          question: "What is output?",
          expectedAnswer: "3",
          explanation: "10 divided by 3 is 3.333. Fast floor division // discards the fractional decimal part."
        },
        errorIdentification: {
          code: "if password = 'admin':\n    print('Welcome')",
          bug: "Single '=' used inside condition comparison.",
          fix: "if password == 'admin':",
          explanation: "Conditional comparisons require equality comparisons using double equals."
        },
        miniExercise: {
          instruction: "Divide 17 by 3 and fetch only the fractional remainder (modulo).",
          starterCode: "",
          sampleSolution: "17 % 3"
        }
      }
    },
    {
      id: "io",
      title: "6. Input / Output (Talking to Users)",
      theory: {
        analogy: "Input and Output are like a bank teller window. Output is the teller sliding a form to you to read (showing information on screen). Input is you writing on that form and passing it back through the slot (typing on the keyboard).",
        why: "So programs can process customized customer data rather than standard precompiled settings.",
        when: "Whenever you ask for user credentials, names, or values inside terminal environments.",
        visual: {
          title: "I/O Stream Flow",
          description: "Data transport between Keyboard and Terminal Screen",
          diagramType: "flow",
          nodes: [
            { id: "key", label: "Keyboard input()", sub: "Halts program, user types, wraps as String", highlight: true },
            { id: "cpu", label: "Script Process", sub: "Manipulates input string contents", highlight: false },
            { id: "scr", label: "Screen print()", sub: "Renders text messages to terminal output", highlight: true }
          ]
        },
        explanation: "Ask questions using `input('prompt')`. Python pauses execution until they press enter. Crucial detail: **input() always yields a string!** If you need numbers, wrap your function call like `int(input())`.",
        internalWorking: "The OS captures keyboard buffers via Standard Input (stdin) streams and returns ASCII character strings to the waiting process.",
        stepByStepCode: [
          { line: "name = input('Name? ')", comment: "Shows prompt, waits, stores keyed answer string in 'name'" },
          { line: "age = int(input('Age? '))", comment: "Immediately converts typed characters into integer number" }
        ],
        commonMistakes: [
          { mistake: "Doing math on input() without int() converters", fix: "age = int(input('Enter age: '))", explanation: "If you input 10, input() extracts string '10', which errors if multiplied or addition-summed numerically." }
        ],
        beginnerTips: ["Use string interpolation f-strings: print(f'Hello {name}!')", "Always add standard space padding inside prompt strings."],
        memoryTrick: "Input enters. Print goes out."
      },
      practice: {
        hint: "We convert standard alphanumeric keyboard outputs into valid integers using int().",
        mcq: {
          question: "What is the target data type of standard input() returns in Python?",
          options: [
            "integer",
            "boolean",
            "string",
            "float"
          ],
          correctAnswer: 2,
          explanation: "Irrespective of numerical keys typed, Python's default input() function converts standard streams into structured strings."
        },
        fillInBlanks: {
          question: "The prefix character for string interpolation is ______.",
          blankWord: "f",
          explanation: "Adding f'Hello {name}' constructs a formatted string, embedding active state inside braces."
        },
        predictOutput: {
          code: "# Simulation: User inputs '10'\nx = input('Number: ')\nprint(x * 2)",
          question: "What is printed if string multiply * repeats characters?",
          expectedAnswer: "1010",
          explanation: "Since x is '10' (string), multiplying repeats the text duplicate '1010' instead of returning code calculation 20."
        },
        errorIdentification: {
          code: "age = input('Your age: ')\nscore = age + 10",
          bug: "Cannot add integer to input string output.",
          fix: "age = int(input('Your age: '))\nscore = age + 10",
          explanation: "Wrap input captures inside int() containers before performing arithmetic calculations."
        },
        miniExercise: {
          instruction: "Write an input call asking the user: 'Enter Name: ' and store the value in employee_name.",
          starterCode: "",
          sampleSolution: "employee_name = input('Enter Name: ')"
        }
      }
    },
    {
      id: "conditions",
      title: "7. Conditions (Making Choices)",
      theory: {
        analogy: "Imagine reaching a coordinate fork on a hiking trail. If the path's signpost points Left to 'Beach', and you are carrying a swimsuit, you go left. Otherwise (else), you walk onto the right forest path. Indented instructions under blocks establish which path you take.",
        why: "Allows programs to react smart and dynamically to user metrics instead of running a fixed sequence of scripts top-to-bottom.",
        when: "Whenever validating safety bounds, like checking if user account cash exceeds withdraw amounts.",
        visual: {
          title: "Fork Decision Gates",
          description: "Branching pathways on evaluations",
          diagramType: "flow",
          nodes: [
            { id: "1", label: "Check age >= 18", sub: "Condition evaluates True or False", highlight: true },
            { id: "2", label: "True path", sub: "Access granted (runs indented area)", highlight: false },
            { id: "3", label: "False path (else)", sub: "Access denied (runs default fallback)", highlight: false }
          ]
        },
        explanation: "Python choices utilize `if`, `elif` (else-if), and default `else` branches. Note the suffix colon `:` and mandatory sub-block indentations.",
        internalWorking: "The CPU tests evaluations using branch-comparison instructions, skipping block sectors dynamically if the condition isn't met.",
        stepByStepCode: [
          { line: "if score >= 90:", comment: "If true, execute all indented lines directly below. Drop colon at end" },
          { line: "    print('Score A!')", comment: "Indented by 4 spaces, belongs to the true-if block" },
          { line: "else:", comment: "Defaults if nothing matches" }
        ],
        commonMistakes: [
          { mistake: "Forgetting the final colon (:) or incorrect indentation alignment", fix: "Double check colon and guarantee inner blocks are padded with 4 spaces", explanation: "Indentation gaps compile physical structure inside Python." }
        ],
        beginnerTips: ["Python doesn't wrap options in parentheses", "Else blocks are matching catch-all paths."],
        memoryTrick: "if is choice 1. elif is intermediate options. else is standard final fallback."
      },
      practice: {
        hint: "We use standard colons ':' to open nested pathway blocks in Python.",
        mcq: {
          question: "Which keyword acts as the standard 'else-if' branch check inside Python?",
          options: [
            "elseif",
            "else if",
            "elif",
            "switch"
          ],
          correctAnswer: 2,
          explanation: "elif stands for else-if, optimizing nested choices in an elegant word structure."
        },
        fillInBlanks: {
          question: "Every if statement line must terminate with a ______ character.",
          blankWord: ":",
          explanation: "Colons indicate the beginning of a fresh logically nested code block scope."
        },
        predictOutput: {
          code: "score = 85\nif score >= 90:\n    print('A')\nelif score >= 80:\n    print('B')\nelse:\n    print('C')",
          question: "What is printed?",
          expectedAnswer: "B",
          explanation: "score is 85. The first 'if' evaluates false. The 'elif' is true so it prints 'B' and skips subsequent rules."
        },
        errorIdentification: {
          code: "if age >= 18\nprint('Adult')",
          bug: "Missing colon and missing indentation.",
          fix: "if age >= 18:\n    print('Adult')",
          explanation: "Python demands colons to indicate nested scoping, alongside indentation spacing."
        },
        miniExercise: {
          instruction: "Write a matching block that prints 'Pass' if points variable exceeds 50.",
          starterCode: "if points > 50:\n    ",
          sampleSolution: "if points > 50:\n    print('Pass')"
        }
      }
    },
    {
      id: "loops",
      title: "8. Loops (The Repetition Wheel)",
      theory: {
        analogy: "Loops are like writing line penalties in school. If the teacher asks you to write 'I will not throw paint' 100 times, you don't rewrite the string uniquely. You keep a tally tracker. Total counts start from 1. Write the sentence, add 1 to tally. Repeat till state counter hits 101. Stop.",
        why: "To automate boring repetitions on large lists of information, like sending emails to 500 club users consecutively.",
        when: "Whenever printing indices, scanning arrays, or running game rendering logic.",
        visual: {
          title: "Wheel cycle mapping",
          description: "Count tracking till limit evaluated",
          diagramType: "grid",
          nodes: [
            { id: "1", label: "Loop counter", sub: "Keeps tabs on cycle index (e.g., 0, 1, 2)", highlight: true },
            { id: "2", label: "Task execution block", sub: "Code that repeats", highlight: false },
            { id: "3", label: "Increment/Check match", sub: "Moves target count or breaks if done", highlight: true }
          ]
        },
        explanation: "Python offers `while` loops (repeats while condition remains True) and highly elegant `for` loops using generators like `range(start, end)`.",
        internalWorking: "Unconditional jumps skip CPU instruction execution indices back to the start of loop scopes dynamically.",
        stepByStepCode: [
          { line: "for i in range(3):", comment: "Generates numbers 0, 1, and 2. End index (3) is exclusive" },
          { line: "    print(i)", comment: "Repeatedly triggers three times, printing 0, 1, 2 on consecutive lines" }
        ],
        commonMistakes: [
          { mistake: "Creating infinite while loops by forgetting counters increment loops", fix: "Always write: count += 1 inside while code", explanation: "If conditions don't switch states to false, programs will loop indefinitely, freezing system resources." }
        ],
        beginnerTips: ["Use range(1, 6) if you need indices 1 to 5 instead of starting with zero", "Use the 'break' statement to exit loops early."],
        memoryTrick: "for loop goes through a predefined series. while loops scan until state conditions switch."
      },
      practice: {
        hint: "Python generators default range boundaries as inclusive on start, exclusive on end.",
        mcq: {
          question: "How many cycles does the block 'for i in range(1, 5)' execute?",
          options: [
            "5",
            "4",
            "3",
            "infinite"
          ],
          correctAnswer: 1,
          explanation: "Starting at 1, range goes through 1, 2, 3, 4. The final boundary number 5 is excluded from execution."
        },
        fillInBlanks: {
          question: "The statement used to immediately terminate loop wheels is ______.",
          blankWord: "break",
          explanation: "Calling 'break' terminates loop scopes instantly, jumping instruction lines downward."
        },
        predictOutput: {
          code: "total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)",
          question: "What is output?",
          expectedAnswer: "6",
          explanation: "The values are 1, 2, and 3. Adding them (1 + 2 + 3) results in a cumulative sum of 6."
        },
        errorIdentification: {
          code: "x = 5\nwhile x > 0:\n    print(x)\n# Infinite run hazard!",
          bug: "No decrement step for x inside while.",
          fix: "x = 5\nwhile x > 0:\n    print(x)\n    x -= 1",
          explanation: "Ensure conditions advance toward an ending condition (false state) to safeguard resources."
        },
        miniExercise: {
          instruction: "Write a for loop signature iterating dynamic index count inside range 5.",
          starterCode: "for ",
          sampleSolution: "for i in range(5):"
        }
      }
    },
    {
      id: "functions",
      title: "9. Functions (Creating Custom Tools)",
      theory: {
        analogy: "A function is like a self-contained automatic juice maker. It has an input hopper at the top (parameters—where you feed apples). It contains inner hidden cutting mechanics (internal code steps). It yields standard juice output at the spout (the return value). Once built, you can trigger juice making on-demand anywhere simply by pressing the run button.",
        why: "To avoid copy-pasting active routines. Wrapping blocks in modular structures lets you reuse execution blocks efficiently.",
        when: "Whenever you have blocks of calculation logic triggered from multiple distinct places in your software assets.",
        visual: {
          title: "Tool inputs and outputs",
          description: "Parameter ingestion to return output mechanics",
          diagramType: "container",
          nodes: [
            { id: "prm", label: "Arguments (e.g. 5, 10)", sub: "Input parameters fed to workspace", highlight: true },
            { id: "exe", label: "Function Room (def)", sub: "Executes calculation steps internally", highlight: false },
            { id: "ret", label: "Return (e.g. 15)", sub: "Output computed and returned", highlight: true }
          ]
        },
        explanation: "Declare functions using the `def` keyword, type distinct names, add structural parameters inside parenthesis, and terminate evaluation using `return` values.",
        internalWorking: "Calling functions pushes current execution registers onto memory call-stacks, jumping execution pointer areas to return scopes afterward.",
        stepByStepCode: [
          { line: "def calculate_sum(a, b):", comment: "Registers routine name with two input properties" },
          { line: "    return a + b", comment: "Exits function scope, shifting calculation values to caller" }
        ],
        commonMistakes: [
          { mistake: "Confusing displaying outputs (print) with handing calculation results (return)", fix: "Use return so caller scripts can capture and do math on returned variables", explanation: "print() just displays characters on the monitor. It doesn't pass variables back to scripts." }
        ],
        beginnerTips: ["Keep functions small and focused on executing single tasks", "Write parameters clearly so readers identify expected data structures."],
        memoryTrick: "def defines. return returns. Call the name to start the gears."
      },
      practice: {
        hint: "We initialize custom function scopes in Python using the def keyword.",
        mcq: {
          question: "Code inside functions executes when...",
          options: [
            "We declare the definition using 'def'",
            "We compile the system files",
            "We trigger the function call by invoking its name",
            "We add comment annotations"
          ],
          correctAnswer: 2,
          explanation: "Defining modules doesn't trigger actions. Execution only initiates when explicitly invoking names with arguments."
        },
        fillInBlanks: {
          question: "The keyword used to return values from function scopes as output parameters is ______.",
          blankWord: "return",
          explanation: "The 'return' statement halts internal script execution, passing listed metrics back to callers."
        },
        predictOutput: {
          code: "def double_value(num):\n    return num * 2\n\nval = double_value(10)\nprint(val)",
          question: "What is printed?",
          expectedAnswer: "20",
          explanation: "Executing double_value with 10 returns 20, which is then assigned to val and printed correctly."
        },
        errorIdentification: {
          code: "def greetUser(name):\nprint('Hi ' + name)\n\ngreetUser('John')",
          bug: "Incorrect indentation for function contents.",
          fix: "def greetUser(name):\n    print('Hi ' + name)",
          explanation: "All functional execution bodies must be nested under definitions using 4 spaces."
        },
        miniExercise: {
          instruction: "Define a function named add_ten taking argument x that adds and returns x + 10.",
          starterCode: "def add_ten(x):\n    ",
          sampleSolution: "def add_ten(x):\n    return x + 10"
        }
      }
    }
  ],
  java: [
    {
      id: "intro",
      title: "1. Introduction to Java",
      theory: {
        analogy: "Java is like building a skyscraper using standardized, pre-fabricated steel segments. It has rigid construction guidelines. Everything must reside inside structured containers called 'Classes', demanding clean blueprints before you start assembly.",
        why: "To write robust, cross-platform enterprise systems. Java's 'Write Once, Run Anywhere' model compiles code to compile anywhere.",
        when: "Excellent for enterprise web servers, corporate logistics software, and large-scale, typed microservice grids.",
        visual: {
          title: "Java Execution Circle",
          description: "From source compilation to Bytecode virtual machine runtimes",
          diagramType: "flow",
          nodes: [
            { id: "src", label: "Java Source (.java)", sub: "Highly-typed, verbose class codes", highlight: true },
            { id: "cls", label: "Bytecode compilation (.class)", sub: "Compiled via javac compiler binary", highlight: false },
            { id: "jvm", label: "JVM Execution Engine", sub: "Platform-agnostic fast interpreter", highlight: true }
          ]
        },
        explanation: "Java is a rigid, statically-typed, object-oriented compiled language. In Java, writing code requires setting up classes containing a 'public static void main(String[] args)' entrance function where your software compiles.",
        internalWorking: "Compile using `javac Application.java` to fetch bytecode formats, which the JVM reads on execution requests.",
        stepByStepCode: [
          { line: "public class Main {", comment: "In Java, all executable statements must reside inside a class wrapper matching the source name" },
          { line: "  public static void main(String[] args) {", comment: "The mandatory entry point method for any compiler startup action" },
          { line: "    System.out.println(\"Hello!\");", comment: "Built-in instruction outputting strings to console logs" }
        ],
        commonMistakes: [
          { mistake: "Spelling 'main' incorrectly or ignoring case parameters", fix: "Always write 'public static void main'", explanation: "The JVM will fail to start if the exact entrance blueprint configuration is absent." }
        ],
        beginnerTips: ["Always terminate code lines with semicolons (;)", "Match class names exactly to files on disk."],
        memoryTrick: "Java compile: Bytecode compiles, JVM executes, anywhere it flies."
      },
      practice: {
        hint: "All statements in Java must terminate with standard terminal semicolons.",
        mcq: {
          question: "Which component executes Java's compiled bytecode formats on end-user target devices?",
          options: [
            "JVM (Java Virtual Machine)",
            "Browser Extensions",
            "Direct Hardware motherboard",
            "C Compiler engines"
          ],
          correctAnswer: 0,
          explanation: "Java files compile into platform-agnostic Bytecode, which the JVM reads and translates into hardware actions."
        },
        fillInBlanks: {
          question: "The mandatory file extension for compile outputs containing bytecode in Java is .______.",
          blankWord: "class",
          explanation: "Java files contain .java sources, compiling into final executable .class bytecode assets."
        },
        predictOutput: {
          code: "public class Test {\n  public static void main(String[] args) {\n    System.out.print(\"A\");\n    System.out.print(\"B\");\n  }\n}",
          question: "What is the stdout output?",
          expectedAnswer: "AB",
          explanation: "System.out.print() outputs values sequentially without introducing newlines, resulting in concatenated letters 'AB'."
        },
        errorIdentification: {
          code: "class main {\n  Void main() {\n    System.out.println(\"Hi\")\n  }\n}",
          bug: "Capitalized V in Void, lower entrance signatures, missing semicolon.",
          fix: "public static void main(String[] args) {\n    System.out.println(\"Hi\");\n  }",
          explanation: "Java holds rigid standard formats to map compilations across class hierarchies."
        },
        miniExercise: {
          instruction: "Write the line that prints 'Java Code' to screen wrapped in standard printlines.",
          starterCode: "",
          sampleSolution: "System.out.println(\"Java Code\");"
        }
      }
    }
  ],
  c: [
    {
      id: "intro",
      title: "1. Introduction to C",
      theory: {
        analogy: "C is like driving a manual formula-1 racing car with no seatbelts, airbags, or electronic aids. You are in direct contact with the steering mechanics (RAM hardware). That gives incredible speed, but you must direct parking indices cautiously to avoid catastrophic crashes.",
        why: "To code operating systems, firmware, or performance-critical engines closest to microchip silicon gates.",
        when: "Use C for drivers, microcontrollers, real-time audio systems, and OS kernel layers.",
        visual: {
          title: "Source to Binary compilation",
          description: "Direct mapping of C files to hardware machinery native codes",
          diagramType: "flow",
          nodes: [
            { id: "c_s", label: "C Source (.c)", sub: "Structured function lines", highlight: true },
            { id: "bin", label: "Native Executable Binary", sub: "Compiled via gcc directly to machine CPU code", highlight: false },
            { id: "ram", label: "Direct Memory layout", sub: "Manipulates RAM locations directly", highlight: true }
          ]
        },
        explanation: "C is a procedural, compiled syntax language. In C, there are no virtual machines or interpreters. Your programs compile straight into raw computer executables.",
        internalWorking: "Preprocessors expand macros, compile blocks translate structural tags into assembly level, and linkers unite binary modules into physical executable outputs.",
        stepByStepCode: [
          { line: "#include <stdio.h>", comment: "Imports standard input output headers containing print commands" },
          { line: "int main() {", comment: "The entrance function yielding return signals back to the operating system shell" },
          { line: "    printf(\"Hello, C!\");", comment: "Formatted print printing strings to screen stdout stream" },
          { line: "    return 0;", comment: "0 exit status indicates healthy software execution" }
        ],
        commonMistakes: [
          { mistake: "Forgetting '#include <stdio.h>' or semicolons", fix: "Always wrap headers and append standard semicolons", explanation: "C compilers need structural declarations to link active print utilities on compilation calls." }
        ],
        beginnerTips: ["Keep track of where values store in memory", "Return status codes from your main block."],
        memoryTrick: "C is for Close: Close to CPU, close to hardware commands."
      },
      practice: {
        hint: "We load standard print tools in C using preprocessor inclusions like #include <stdio.h>.",
        mcq: {
          question: "Which of the following is true about compilation outputs of C applications?",
          options: [
            "They run on standard JVM wrappers",
            "They compile directly to native machine machine binary executable for the target CPU",
            "They require web browsers to translate",
            "They are plain text bytecode run line-by-line"
          ],
          correctAnswer: 1,
          explanation: "C compilers (gcc, clang) output native system binary, granting direct machine run speeds without interpreters."
        },
        fillInBlanks: {
          question: "The standard core function to print output to screens in C is ______.",
          blankWord: "printf",
          explanation: "The printf() (print formatted) command pushes customized strings directly to console environments."
        },
        predictOutput: {
          code: "#include <stdio.h>\nint main() {\n    printf(\"1\");\n    printf(\"2\");\n    return 0;\n}",
          question: "What is stdout?",
          expectedAnswer: "12",
          explanation: "Since printf doesn't append newlines unless specifying escaper '\\n', numbers write adjacent as '12'."
        },
        errorIdentification: {
          code: "main() {\n    printf(\"error\")\n}",
          bug: "Missing header inclusion, missing semicolon, and missing int return typing.",
          fix: "#include <stdio.h>\nint main() {\n    printf(\"error\");\n    return 0;\n}",
          explanation: "C requires type declarations and active headers to link standard execution routines."
        },
        miniExercise: {
          instruction: "Write a signature for standard C main function returning integers.",
          starterCode: "",
          sampleSolution: "int main() {\n    return 0;\n}"
        }
      }
    }
  ],
  cpp: [
    {
      id: "intro",
      title: "1. Introduction to C++",
      theory: {
        analogy: "If C is a manual standard racing car, C++ is that same racing car equipped with state-of-the-art customizable rocket boosters (Objects, Classes, and Templates). It is highly advanced, letting you compile structured patterns without sacrificing hardware execution loops.",
        why: "To bundle C speed loops with structured model controls for large software frameworks like Game Engines.",
        when: "Core database engines, AAA game pipelines (Unreal Engine), and advanced operating systems components.",
        visual: {
          title: "Feature Extension Loop",
          description: "Union of direct memory procedural codes with Class Object templates",
          diagramType: "grid",
          nodes: [
            { id: "pro", label: "C Engine Procedures", sub: "Speed execution rules", highlight: true },
            { id: "obj", label: "C++ OOP Objects", sub: "Classes, encapsulation structures", highlight: false },
            { id: "std", label: "Standard Templates (STL)", sub: "Vectors, advanced lists", highlight: true }
          ]
        },
        explanation: "C++ extends the legacy of C by introducing powerful Object-Oriented primitives. It lets you construct safe models while keeping C direct hardware access.",
        internalWorking: "Compile parameters optimize class layout models into binary offsets directly for the target CPU architecture.",
        stepByStepCode: [
          { line: "#include <iostream>", comment: "Loads stream interface containing input and output tools" },
          { line: "int main() {", comment: "Mandatory system entry point" },
          { line: "    std::cout << \"Hello from C++!\" << std::endl;", comment: "Streams characters directly to standard output console using namespaces" }
        ],
        commonMistakes: [
          { mistake: "Forgetting to type namespace specifiers (std::)", fix: "Add 'using namespace std;' or prepend 'std::'", explanation: "Standard C++ outputs reside inside the 'std' naming room namespace." }
        ],
        beginnerTips: ["Use standard output streams like std::cout", "Avoid mixing C pointers and C++ references when starting out."],
        memoryTrick: "C++ means increment: C code plus custom classes and streams."
      },
      practice: {
        hint: "We stream characters to display screens in C++ using the stream operator << under std::cout.",
        mcq: {
          question: "Which stream operator sends text data to standard outputs in C++?",
          options: [
            ">>",
            "<<",
            "+=",
            "->"
          ],
          correctAnswer: 1,
          explanation: "The redirection operator << pushes string buffers into the output stream object context."
        },
        fillInBlanks: {
          question: "The header required to handle standard console stream logs in C++ is ______.",
          blankWord: "iostream",
          explanation: "iostream contains declarations for standard stream objects (cout, cin, cerr)."
        },
        predictOutput: {
          code: "#include <iostream>\nint main() {\n    std::cout << \"C\" << \"++\";\n    return 0;\n}",
          question: "What is printed?",
          expectedAnswer: "C++",
          explanation: "Consecutive redirection streams concatenate inputs seamlessly onto the screen output."
        },
        errorIdentification: {
          code: "#include <iostream>\nint main() {\n    cout << \"error\";\n}",
          bug: "Missing std:: or namespace specifiers, and missing return statement.",
          fix: "#include <iostream>\nint main() {\n    std::cout << \"error\";\n    return 0;\n}",
          explanation: "C++ is extremely type-specific. Standard entities must be declared under std namespace."
        },
        miniExercise: {
          instruction: "Write the stream line to print 'Hello' followed by a standard newline.",
          starterCode: "",
          sampleSolution: "std::cout << \"Hello\" << std::endl;"
        }
      }
    }
  ]
};
