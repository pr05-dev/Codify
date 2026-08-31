export interface ComparisonCode {
  language: string;
  code: string;
  note?: string;
}

export interface DidYouKnowItem {
  topicId: string;
  title: string;
  comparisons: ComparisonCode[];
  interestingFact: string;
  additionalTip?: string;
}

export const DID_YOU_KNOW_DATA: Record<string, DidYouKnowItem> = {
  intro: {
    topicId: "intro",
    title: "How Python, Java, C, and C++ Compare!",
    comparisons: [
      {
        language: "Python",
        code: `print("Hello World")`,
        note: "Short and clean, runs through an interpreter instantly with no wrapper needed."
      },
      {
        language: "Java",
        code: `public class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello World");\n  }\n}`,
        note: "Strictly object-oriented; all instructions must live inside a blueprint class."
      },
      {
        language: "C",
        code: `#include <stdio.h>\nint main() {\n    printf("Hello World\\n");\n    return 0;\n}`,
        note: "Procedural and close to the metal, compilable into raw native machine instructions."
      },
      {
        language: "C++",
        code: `#include <iostream>\nint main() {\n    std::cout << "Hello World" << std::endl;\n    return 0;\n}`,
        note: "Extends C with object-oriented powers and clean input/output streams."
      }
    ],
    interestingFact: "Python was named after the British comedy troupe 'Monty Python' because the creator wanted programming to be fun! Java, on the other hand, was named after the coffee the developers drank, and C got its simple name because it was the successor of a programming language called 'B'!",
    additionalTip: "C and C++ compile directly into CPU instructions, making them lightning fast, whereas Python and Java run on software virtual layers for compatibility."
  },
  setup: {
    topicId: "setup",
    title: "Translating Code Behind the Scenes",
    comparisons: [
      {
        language: "Python",
        code: `python my_script.py`,
        note: "Runs code line-by-line using the installed Python Interpreter."
      },
      {
        language: "Java",
        code: `javac Main.java\njava Main`,
        note: "Compiles source file into portable bytecode (.class), then executes on JVM."
      },
      {
        language: "C",
        code: `gcc app.c -o app\n./app`,
        note: "Compiles directly into system-specific native binary executables."
      },
      {
        language: "C++",
        code: `g++ main.cpp -o main\n./main`,
        note: "Compiles stream and class offsets directly into standalone native software."
      }
    ],
    interestingFact: "An installer's main task is adding the binary executable folder to your machine's 'PATH' environment variable. 'PATH' acts as an index directory for your operating system—if a tool is not on the PATH, your terminal will report 'command not found'!",
    additionalTip: "In Python, IDEs run the raw files instantly, but under the hood, the system is performing compilation to hidden '.pyc' files anyway to load it faster!"
  },
  variables: {
    topicId: "variables",
    title: "Static vs Dynamic Typing",
    comparisons: [
      {
        language: "Python",
        code: `age = 20`,
        note: "Dynamic typing: No type declared. The variable holds a reference and can change shapes later."
      },
      {
        language: "Java",
        code: `int age = 20;`,
        note: "Static typing: Must declare 'int' first. The compiler enforces that only numbers fit in this box."
      },
      {
        language: "C",
        code: `int age = 20;`,
        note: "Statically typed: Allocates a precise chunk of physical memory on stack space."
      },
      {
        language: "C++",
        code: `int age = 20;\n// or\nauto age = 20;`,
        note: "Allows static typing, but also supports 'auto' where the compiler deduces the type for you."
      }
    ],
    interestingFact: "In strongly/statically typed languages like Java, C, and C++, typing check errors are caught *before* the application starts (at compile time). In dynamically typed languages like Python, typos or typing conflicts will only trigger an error in real-time when that line executes!",
    additionalTip: "Think of variables like physical boxes. Statically typed variables have solid custom-shaped openings (only square boxes fit square pegs), while dynamic variables have flexible openings that adapt to whatever you slide inside."
  },
  datatypes: {
    topicId: "datatypes",
    title: "How Data Shapes Exist in Memory",
    comparisons: [
      {
        language: "Python",
        code: `name = "Code"      # str\nage = 20           # int\nratio = 2.5        # float\nis_new = True      # bool`,
        note: "Flexible basic shapes. Python handles scaling bounds without memory overflows automatically."
      },
      {
        language: "Java",
        code: `String name = "Code";\nint age = 20;\ndouble ratio = 2.5;\nboolean isNew = true;`,
        note: "Distinct primitive structures vs advanced class objects (e.g., int vs String)."
      },
      {
        language: "C",
        code: `char name[] = "Code";\nint age = 20;\nfloat ratio = 2.5;\n_Bool isNew = 1;     // or int`,
        note: "No real 'string' type! Strings are arrays of characters terminating with \\0 (null marker)."
      },
      {
        language: "C++",
        code: `std::string name = "Code";\nint age = 20;\nfloat ratio = 2.5;\nbool isNew = true;`,
        note: "Features std::string class objects to solve the lack of direct string support in basic C."
      }
    ],
    interestingFact: "In early standard C, there was no 'boolean' (true/false) datatype! Instead, the number 0 was used to mean 'False', and any non-zero number (usually 1) represented 'True'. That is why modern systems still treat 0 and 1 as flags in logic gates!",
    additionalTip: "Because C strings have no explicit bound limits, reading them relies on locating the null-terminating '\\0' byte. Forgetting this byte is one of the biggest causes of historical buffer-overflow computer hacks!"
  },
  operators: {
    topicId: "operators",
    title: "Modulo Magic and Division Rules",
    comparisons: [
      {
        language: "Python",
        code: `10 / 3   # Returns 3.33333333333\n10 // 3  # Floor division, returns 3\n10 % 3   # Modulo, returns 1`,
        note: "Python supports floor division // as a built-in symbol, saving you casting functions."
      },
      {
        language: "Java",
        code: `10 / 3;             // Integer division, returns 3\n10.0 / 3;           // Returns 3.33333333333\n10 % 3;             // Modulo, returns 1`,
        note: "In Java, dividing two integers discards decimal digits, but including a decimal .0 unlocks floats."
      },
      {
        language: "C",
        code: `10 / 3;             // Returns 3\n10.0 / 3.0;         // Returns 3.3333333\n10 % 3;             // Modulo, returns 1`,
        note: "Dividing ints results in truncating decimals directly unless operands are cast to float types."
      },
      {
        language: "C++",
        code: `10 / 3;             // Returns 3\n10.0 / 3;           // Returns 3.3333333\n10 % 3;             // Modulo, returns 1`,
        note: "Behaves identically to C's math processors, translating to direct arithmetic ALU steps."
      }
    ],
    interestingFact: "The Modulo operator (%) is highly popular in coding. It evaluates leftovers. If you want to check if any number is even, you do: 'number % 2 == 0'. If it leaves a remainder of 0, the number is guaranteed to be even! It's also used to keep things spinning inside a container size.",
    additionalTip: "Computers do not natively understand division. Processor ALUs actually perform division inside by doing successive subtraction cycles under the hood!"
  },
  io: {
    topicId: "io",
    title: "Speaking to Users and Grabbing Keypresses",
    comparisons: [
      {
        language: "Python",
        code: `user_name = input("Enter Name: ")\nprint(f"Hello, {user_name}!")`,
        note: "Short and elegant. The value input() captures is always string characters by default."
      },
      {
        language: "Java",
        code: `import java.util.Scanner;\nScanner scan = new Scanner(System.in);\nString name = scan.nextLine();\nSystem.out.println("Hello, " + name + "!");`,
        note: "Requires instantiating a Scanner helper object to scan Standard Input (System.in)."
      },
      {
        language: "C",
        code: `char name[50];\nscanf("%49s", name);\nprintf("Hello, %s!\\n", name);`,
        note: "Requires safe format specifiers (%s) and allocating char array buffer slots ahead of time."
      },
      {
        language: "C++",
        code: `std::string name;\nstd::cin >> name;\nstd::cout << "Hello, " << name << "!" << std::endl;`,
        note: "Replaces C's scanf with stream operators. 'cin' stands for Console Input, 'cout' for Console Output."
      }
    ],
    interestingFact: "When a program waits for keyboard input, it consumes 0% of your CPU! The Operating System pauses the thread of your program until the keyboard sends a hardware interrupt key signal, waking the program back up with the character bytes safely in hand.",
    additionalTip: "Always remember: No matter what keys you hit (including numbers), computer input layers capture them as raw text string characters first!"
  },
  conditions: {
    topicId: "conditions",
    title: "Branching Scopes and Layout Gaps",
    comparisons: [
      {
        language: "Python",
        code: `if age >= 18:\n    print("Access Granted")\nelif age >= 16:\n    print("Almost There")\nelse:\n    print("Locked")`,
        note: "Clever layout utilizing indentation blocks (colons + 4 spaces) instead of brackets {}."
      },
      {
        language: "Java",
        code: `if (age >= 18) {\n    System.out.println("Access Granted");\n} else if (age >= 16) {\n    System.out.println("Almost There");\n} else {\n    System.out.println("Locked");\n}`,
        note: "Requires parenthesis around conditions, statements wrapped in curly braces, and semicolons."
      },
      {
        language: "C",
        code: `if (age >= 18) {\n    printf("Access Granted\\n");\n} else if (age >= 16) {\n    printf("Almost There\\n");\n} else {\n    printf("Locked\\n");\n}`,
        note: "Follows same basic procedural rules. Braces map out control pathways explicitly."
      },
      {
        language: "C++",
        code: `if (age >= 18) {\n    std::cout << "Access Granted\\n";\n} else if (age >= 16) {\n    std::cout << "Almost There\\n";\n} else {\n    std::cout << "Locked\\n";\n}`,
        note: "Leverages standard standard control syntaxes with cout streaming mechanics."
      }
    ],
    interestingFact: "Under the hood, the CPU keeps a dynamic 'Program Counter' pointing to the current execution index. An 'if' statement compiles to a comparison instruction in machine code. If the evaluation is False, the processor is told to skip ahead (make a 'branch jump') to the default instruction index!",
    additionalTip: "While Python uses indentation for compilation structure, C, C++, and Java use curly braces. Indentation in those languages is purely for neat reading, though highly recommended."
  },
  loops: {
    topicId: "loops",
    title: "Executing Repetitions Efficiently",
    comparisons: [
      {
        language: "Python",
        code: `for i in range(5):\n    print(i)`,
        note: "Iterating ranges of numbers. range(0, 5) generates values 0 to 4 (exclusive of 5)."
      },
      {
        language: "Java",
        code: `for (int i = 0; i < 5; i++) {\n    System.out.println(i);\n}`,
        note: "A classical loop setup: Init counter, check condition, increment count."
      },
      {
        language: "C",
        code: `int i;\nfor (i = 0; i < 5; i++) {\n    printf("%d\\n", i);\n}`,
        note: "Traditional C requires variables to be declared at the top of the scope before loop initialization."
      },
      {
        language: "C++",
        code: `for (int i = 0; i < 5; i++) {\n    std::cout << i << std::endl;\n}`,
        note: "Looks identical to Java's loop syntax, feeding counters straight into machine registers."
      }
    ],
    interestingFact: "An infinite loop (like write 'while True:') doesn't physically damage your machine, but it will utilize the targeted CPU core at 100%! Modern Operating Systems prevent entire computer lockups by rotating execution time slots among active applications (multitasking thread schedulers).",
    additionalTip: "Even though loops look different, compilers are so smart that they optimize loops of different syntaxes into the exact same quick machine-level jumped loops!"
  },
  functions: {
    topicId: "functions",
    title: "Structuring Isolated Custom Toolkits",
    comparisons: [
      {
        language: "Python",
        code: `def calc_sum(a, b):\n    return a + b`,
        note: "Prefixes tool names with 'def' (define) and returns dynamic objects without static type hints."
      },
      {
        language: "Java",
        code: `public static int calcSum(int a, int b) {\n    return a + b;\n}`,
        note: "Must set input and output types explicitly, and compile inside a Class scope wrapper."
      },
      {
        language: "C",
        code: `int calc_sum(int a, int b) {\n    return a + b;\n}`,
        note: "Fully standalone procedural function. Returns integer, inputting strongly-typed numbers."
      },
      {
        language: "C++",
        code: `int calc_sum(int a, int b) {\n    return a + b;\n}`,
        note: "Allows static declarations, adding references, and function overloading variants."
      }
    ],
    interestingFact: "When your computer calls a function, it allocates a temporary memory buffer called a 'Stack Frame' to store that function's properties. When the function returns, this workspace frame is discarded! If a function calls itself infinitely (known as infinite recursion), the system stack overflows, giving name to the website 'Stack Overflow'!",
    additionalTip: "Print statements just echo letters on screens. Return statements actually hand mathematical results back to other parts of your code to use."
  }
};
