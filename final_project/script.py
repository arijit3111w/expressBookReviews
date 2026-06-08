import subprocess
import os

def run_cmd(cmd):
    try:
        result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
        return result.stdout.strip()
    except Exception as e:
        return str(e)

with open('answers.txt', 'w', encoding='utf-8') as f:
    cmds = [
        ('Task 1 (githubrepo)', 'curl.exe -s https://api.github.com/repos/arijit3111w/expressBookReviews'),
        ('Task 2 (getallbooks)', 'curl.exe -s http://localhost:5000/'),
        ('Task 3 (getbooksbyISBN)', 'curl.exe -s http://localhost:5000/isbn/1'),
        ('Task 4 (getbooksbyauthor)', 'curl.exe -s http://localhost:5000/author/Chinua%20Achebe'),
        ('Task 5 (getbooksbytitle)', 'curl.exe -s http://localhost:5000/title/Things%20Fall%20Apart'),
        ('Task 6 (getbookreview)', 'curl.exe -s http://localhost:5000/review/1'),
        ('Task 7 (register)', 'curl.exe -s -X POST http://localhost:5000/register -H "Content-Type: application/json" -d "{\\"username\\": \\"newuser\\", \\"password\\": \\"newpassword\\"}"'),
        ('Task 8 (login)', 'curl.exe -s -c cookies.txt -X POST http://localhost:5000/customer/login -H "Content-Type: application/json" -d "{\\"username\\": \\"newuser\\", \\"password\\": \\"newpassword\\"}"'),
        ('Task 9 (reviewadded)', 'curl.exe -s -b cookies.txt -X PUT http://localhost:5000/customer/auth/review/1 -H "Content-Type: application/json" -d "{\\"review\\": \\"Excellent book!\\"}"'),
        ('Task 10 (deletereview)', 'curl.exe -s -b cookies.txt -X DELETE http://localhost:5000/customer/auth/review/1')
    ]
    for name, cmd in cmds:
        f.write(f"### {name}\n")
        f.write(f"Command:\n{cmd}\n\n")
        f.write(f"Output:\n{run_cmd(cmd)}\n\n---\n\n")

    f.write("### Task 11 (GitHub URL of general.js)\n")
    f.write("https://github.com/arijit3111w/expressBookReviews/blob/main/final_project/router/general.js\n")