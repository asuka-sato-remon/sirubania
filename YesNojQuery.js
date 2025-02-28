/*
1.診断スタートで一番最初の質問内容を呼び出す
2.「次の質問へ」で次の質問内容を呼び出す
3.選択肢を選択したとき
4.「診断結果へ」を押したら診断結果を呼び出す
5.「診断終了」でやめる
*/

//parentsは指定した要素の親を探す

//スタートボタンは最初の画面を完全に消すから処理がわけられている。
$(function (){
    //診断スタート（tool-btn）を押したら{}内の処理を実行
    $('.tool-btn').on('click', function (){
        //this(クリックされたボタン)のbox-linkを取得
        var target = $(this).data('box-link');
        //jQuery で $('#id名') と書くと、HTML の ID 属性を持つ要素を取得 できる。
        var box = $('#' + target);

        //診断スタートを非表示に

        $(this).addClass('is-inactive');

        //parentはboxの親要素を取得。is-inactiveを追加することで現在のboxを非表示にする。
        //次の質問に行くため。
        $(this).closest('.box').addClass('is-inactive');
        //ふわっと段階的に次のボックスを表示させる。
        $(box).removeClass('is-inactive').fadeIn();
    });

    //「次の質問へ」がクリックされたら
    //.box(クラス名でありvar boxではない)の中にある.tool-btnがクリックされたら処理を実行する。
    $('.box .tool-btn').on('click', function(){
        //parentsでクリックされたボタンの親要素.boxを取得、1.2秒かけてfadeout
        $(this).parents('.box').fadeOut(1200);
        //.boxにis-active（非表示）クラスがなかったら付ける。fadeoutだけでもいいけどcssで細かく制御できる。
        $(this).parents('.box').toggleClass('is-inactive');

        //次のボックスを表示
        var nextBox=$(this).parents('.box').next('.box');
        nextBox.removeClass('is-inactive').fadeIn();
    });

    //選択肢がクリックされたら
    //selectがクリックされたら実行する
    $('.select').on('click', function (){
        //this(クリックしたもの)にis-activeを追加/削除する。
        $(this).toggleClass('is-inactive');
        /*
        siblings=.selectクラスを持っているものすべて。remove=取ってきたselectからis-activeを削除。
        例「インドア」選択→thisがインドアボタンになる。siblings('.select')はアウトドアを取ってくる。
        クリックしたボタンのis-inactive→1回クリックでON、もう1回クリックでOFF（選択解除）
        ほかの選択肢のis-inactive→選択肢を1つだけ選べるようにする（選択解除）
        */
        $(this).siblings('.select').removeClass('is-inactive');
        //boxまで遡り、boxクラスの中のselectをすべて探す→Yes/Noどっちも入る
        var select = $(this).parents('.box').find('.select');
        //toolボタンクラス（次の質問へ）を変数に格納
        var toolBtn = $(this).parents('.box').find('.tool-btn.next');

        //選択されていないとボタンをクリックできないようにする
        //var selectにどれか一つでもis-inactiveクラスを持っているか選択する(あったらtrue)
        if(select.hasClass('is-inactive')){
            //var toolBtnのis-inactiveクラスを削除→ボタン表示
            toolBtn.removeClass('is-inactive');
        }else{
            //どの選択肢にもis-inactiveがついていないなら、is-inactiveをつける→次の質問へ非表示
            toolBtn.addClass('is-inactive');
        }
    });

    //診断結果の出しわけ
    //tool-btnがクリックされたら
    $('.tool-btn.next.is-active').on('click', function(){
        console.log("診断結果ボタンがクリックされました")

        //診断結果を計算
        /*
        $('#question1 .select.yes')は1つ目の質問のyesボタン
        hasClass('is-inactive')はこのボタンにis-inactiveがついているか？
        is-inactiveがついていたら0、ついていなかったら1（yesが選ばれている）
        */
        var question1 = $('#question1 .select.yes').hasClass('is-inactive') ? 0 : 1;
        var question2 = $('#question2 .select.yes').hasClass('is-inactive') ? 0 : 1;
        var question3 = $('#question3 .select.yes').hasClass('is-inactive') ? 0 : 1;
        var question4 = $('#question4 .select.yes').hasClass('is-inactive') ? 0 : 1;

        //組み合わせを16通りの数字（0～15に変換）。2進数を10進数に変える。
        var resultIndex = (question1 * 8) + (question2 * 4) + (question3 * 2) + (question4 * 1);
        /*診断結果を表示*/
        console.log(resultIndex);
        $('#answer' + (resultIndex + 1)).fadeIn();
    });

    //診断を閉じる
    //closeボタン（閉じるボタン）とtool-btn.finishをクリックしたとき
    $('.close-btn, .tool-btn.finish').on('click', function(){
        //boxクラスを持つ要素を非表示に（素早く）
        $('.box').fadeOut("fast");
        //再表示できるようにいろいろ消しとく
        $('.select, .btn-wrap, .box-wrap, .box').removeClass('is-inactive');
        //次の質問へ進むボタンを非表示
        $('.tool-btn.next').addClass('is-inactive');
     });

});
