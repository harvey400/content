<template>
    <div class="bg-pink-200 noselect bg">
        <div class="h-72">
        </div>
        <div class="message-font text-6xl text-center"> 
            <span class="text-9xl">Cheers!</span> <br><br><br><br><br><br><br>
            to our <br><br><br><br><br><br><br>
            <span class="text-9xl">9th</span><br>
            <span class="text-8xl">
                monthsary<br>
                celebration 
            </span>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
            <span class="text-8xl">I love you</span>
            <br>
            <br>
            <br>
            <br>
            <br>
            <br>
        </div>
        <div class="h-72">
        </div>
        <div class="h-72">
        </div>
        <div class="h-72">
        </div>
        <div class="h-72">
                <img  class="" src="/2/pic.jpg">
        </div>
        <div class="h-72">
        </div>
        <div class="h-72">
        </div>
        <div class="h-72">
            <div style="width:100%" class="flex justify-around">
                <img  class="flower" src="/2/flower.png" height="100" width="100">
                <img  class="flower" src="/2/flower.png" height="100" width="100">
            </div>
            <div style="width:100%" class="flex justify-around">
                <img  class="flower" src="/2/flower.png" height="100" width="100">
                <img  class="flower" src="/2/flower.png" height="100" width="100">
            </div>
            <div style="width:100%" class="flex justify-around">
                <img  class="flower" src="/2/flower.png" height="100" width="100">
                <img  class="flower" src="/2/flower.png" height="100" width="100">
            </div>
            <div style="width:100%" class="flex justify-around">
                <span></span>
                <img  class="flower" src="/2/flower.png" height="100" width="100">
                <img  class="flower" src="/2/flower.png" height="100" width="100">
                <span></span>
            </div>
            <div style="width:100%" class="flex justify-around">
                <img  class="flower" src="/2/flower.png" height="100" width="100">
            </div>
        </div>
        <div class="h-20">
        </div>
        <div class="h-72">            
            <div style="width:100%" class="flex justify-around">
                <span></span>
                <img  class="flower" src="/2/kimkim.png" height="150" width="150">
                <img  class="flower" src="/2/covida.png" height="150" width="150">
                <span></span>
            </div>
        </div>
        <div class="h-72">
        </div>
    </div>
</template>
<script>
    export default {
        setup() {
            console.log("sss");
        }
    }
</script>
<style scroped>
body{
  overflow:scroll !important;  
}
.message-font{
    font-family:Brush Script MT, Brush Script Std, cursive
}

.flower{
    animation-name: spin;
    animation-duration: 5000ms;
    animation-iteration-count: infinite;
    animation-timing-function: linear; 
}

@keyframes spin {
    from {
        transform:rotate(0deg);
    }
    to {
        transform:rotate(360deg);
    }
}
</style>