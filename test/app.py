from flask import Flask, render_template, request, redirect
app = Flask(__name__)
        
app.secret_key = "caircocoders-ednalan"
        
@app.route('/')
def index():
    return render_template('index.html')
 
@app.route("/test",methods=["POST","GET"])
def test():
     
     if request.method=="POST":
         a=request.get_json("params")
         print(a)
         string="adbc  "+a['name']
         return False
     else:
         return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)