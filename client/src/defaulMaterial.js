const stubs = () => {};

stubs.cpp = `#include <iostream>

using namespace std;

int main()
{
    cout<<"Hello World";

    return 0;
}
`;

stubs.c = `#include<stdio.h>
int main() {
    printf("Hello World!\\n");
}`;

stubs.py = `print("Hello World!")
`;

module.exports = stubs;
