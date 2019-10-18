<script>
    import { Button, Modal } from "@deimimi/strawberry";

    const ASTONISHED = "🤦";
    const FLUSHED = "😳";
    const HALO = "😇";
    
    let caution_modal = null;
    let emoji = ASTONISHED;

    //CSS Selectors for gmail buttons
    let recepient_selector = "div.iw.ajw > span.hb";
    let cancel_selector = "div.J-Z-I-J6-H.J-J5-Ji .og.T-I-J3";
    let reply_selectors = [
        ".amn .ams.bkH",
        ".T-I.J-J5-Ji.T-I-Js-IF.aaq.T-I-ax7.L3",
        "div.b7.J-M div#r",
    ];

    document.body.addEventListener("click", (event) => {
        //Check if user is viewing a BCC email
        let bcc_span = document.querySelector(recepient_selector);
        if(bcc_span && bcc_span.innerText.includes('bcc: me')){
            // Call user an idiot if they clicked the reply button
            reply_selectors.forEach(selector => {
                if(event.target.closest(selector)) {
                    caution_modal.show();
                }
            })
        }
    }, true)

    //close reply box. phew!
    function okay() {
        let cancel_reply = document.querySelector(cancel_selector);
        //keep checking for cancel reply until it's loaded, then click.
        let timer = setInterval(() => {
            if(cancel_reply) {
                cancel_reply.click();
                clearInterval(timer);
            } else {
                cancel_reply = document.querySelector(cancel_selector);
            }
        }, 200);
        caution_modal.hide();
    }

    //let user continue if they know what they're doing
    function leave_me_alone(){
        caution_modal.hide();
    }
</script>

<Modal bind:this={caution_modal} closable={false}>
    <div slot="content">
        <div class="content-item warning">
        Hey stupid, stop!{emoji} You're were BCC'ed to this email.
        </div>
        <div class="content-item buttons">
            <Button color="primary" 
                on:click={okay} on:mouseover={()=> emoji = HALO}
                on:mouseout={()=> emoji = ASTONISHED}>Cancel Reply</Button>
            <Button class="default" on:click={leave_me_alone}
                on:mouseover={()=> emoji = FLUSHED}
                on:mouseout={()=> emoji = ASTONISHED}>Leave me alone</Button>
        </div>
    </div>
</Modal>

<style>
    .content-item.warning {
        padding: 10px 0;
        transition:all 0.4s ease-in-out;
    }
    .content-item :global(button.primary) {
        background-color: #f33 !important;
    }
    .content-item :global(button.primary:hover) {
        background-color: #f55 !important;
    }
    .content-item :global(button.default:hover) {
        border-color: #d9d9d9 !important;
        background-color: #f0f0f0 !important;
        color: rgb(0,0,0, 0.65) !important;
    }
    .content-item :global(button.primary:hover) {
        background-color: #f44 !important;
    }
    :global(.content-item.buttons) {
        display: flex;
        justify-content: flex-end;
    } 
    .content-item :global(button + button) {
        margin-left: 10px;
    }    
    :global(.gb_xa) {
        color: white;
        background-color: purple;
        line-height: 32px;
        text-align: center;
        font-size: 18px;
    }
    :global(.gb_xa::before) {
        content: 'A' !important;
    }
</style>