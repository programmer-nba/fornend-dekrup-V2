<template>
    <div class="grid">
        <div class="col-12 text-center">
            <h1>การจัดการฟังก์ชั่นเพิ่มเติม</h1>
        </div>
    </div>
    <div class="grid">
        <div class="col-12 text-center">
            <Button @click="displayAdd = true">เพิ่มฟังก์ชั่น</Button>
        </div>
    </div>
    <div class="grid">
        <div class="col-12 lg:col-4" v-for="item in item_function" :key="item">
            <div class="surface-section shadow-2 p-5 mt-2">
                <div class="font-medium text-3xl text-900 mb-3">
                    {{ item.func_topic }}
                </div>
                <div class="text-500 mb-5">
                    {{ item.func_discription }}
                </div>
                <div class="w-full md:w-8 md:flex-order-0 flex-order-1">
                    <Tag class="mb-2 bg-blue-100 text-blue-600" :value="item.func_type"></Tag>
                </div>
                <li class="flex align-items-center py-3 px-2 border-top-1 surface-border flex-wrap"></li>
                <div class="grid">
                    <div class="col">
                        <Button label="Edit" icon="pi pi-pencil" class="p-button-outlined w-full"
                            @click="openDialog(item)"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- DialogUpdate -->
    <Dialog header="รายละเอียดฟั่งก์ชั่น" v-model:visible="displayUpdate"
        :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :style="{ width: '700px' }" :modal="true" class="p-fluid">
        <div class="field">
            <label for="func_topic">Topic</label>
            <InputText id="func_topic" v-model="detail_function.func_topic" autofocus />
        </div>
        <div class="field">
            <label for="description">Description</label>
            <Textarea id="description" v-model="detail_function.func_discription" rows="3" cols="20" />
        </div>
        <div class="field">
            <label for="func_type" class="mb-3">Type</label>
            <Dropdown id="func_type" v-model="detail_function.func_type" :options="type" optionLabel="name"
                optionValue="code" placeholder="เลือกประเภทของฟังก์ชั่น">
            </Dropdown>
        </div>
        <div class="field">
            <label for="func_detail">Detail</label>
            <div v-if="detail_function.func_type === 'text'">
                <Textarea id="func_detail" v-model="detail_function.func_detail" rows="5" cols="20" />
            </div>
            <div v-else-if="detail_function.func_type === 'image'">
                <div v-for="item in detail_function.func_detail" :key="item">
                    <div class="card">
                        <div class="relative card-container green-container">
                            <div class="relative">
                                <Image :src="this.img + item" width="200" />
                                <div
                                    class="absolute top-0 right-0 font-bold flex align-items-center justify-content-center w-4rem h-4rem border-round">
                                    <Button class="p-button-rounded p-button-danger" icon="pi pi-times"
                                        style="font-size: 2rem" @click="deleteimg(item)" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <FileUpload name="img[]" :customUpload="true" :multiple="true" chooseLabel="เลือกไฟล์" uploadLabel="ตกลง"
                    cancelLabel="ยกเลิก" uploadIcon="pi pi-check" @uploader="add_img"
                    accept="image/jpg,image/png, image/jpeg" invalidFileLimitMessage="สามารถเลือกได้ไฟล์เดียวเท่านั้น"
                    invalidFileSizeMessage="ไฟล์จะต้องขนาดไม่เกิน 5 MB เท่านั้น" :maxFileSize="5242880">
                    <template #empty>
                        <p>Drag and drop files to here to upload.</p>
                    </template>
                </FileUpload>
            </div>
        </div>

        <template #footer>
            <Button label="No" icon="pi pi-times" @click="displayUpdate = false" class="p-button-text" />
            <Button label="Yes" icon="pi pi-check" autofocus @click="edit_function" />
        </template>
    </Dialog>

    <!-- DialogAdd -->
    <Dialog header="เพิ่มฟั่งก์ชั่น" v-model:visible="displayAdd" :breakpoints="{ '960px': '75vw', '640px': '90vw' }"
        :style="{ width: '700px' }" :modal="true" class="p-fluid">
        <div class="field">
            <label for="func_topic">Topic</label>
            <InputText id="func_topic" v-model="func_topic" autofocus />
        </div>
        <div class="field">
            <label for="func_name">Function Name</label>
            <InputText id="func_name" v-model="func_name" autofocus />
        </div>
        <div class="field">
            <label for="description">Description</label>
            <Textarea id="description" v-model="func_discription" rows="3" cols="20" />
        </div>
        <div class="field">
            <label for="func_type" class="mb-3">Type</label>
            <Dropdown id="func_type" v-model="func_type" :options="type" optionLabel="name" optionValue="code"
                placeholder="เลือกประเภทของฟังก์ชั่น">
            </Dropdown>
        </div>
        <div class="field">
            <label for="func_detail">Detail</label>
            <div v-if="func_type === 'text'">
                <Textarea id="func_detail" v-model="detail" rows="5" cols="20" />
            </div>
            <div v-else-if="func_type === 'image'">
                <FileUpload name="image[]" url="https://www.primefaces.org/upload.php" @upload="add_img" :multiple="true"
                    accept="image/jpg,image/png, image/jpeg" :maxFileSize="1000000" chooseLabel="เลือกไฟล์"
                    uploadLabel="ตกลง" cancelLabel="ยกเลิก" uploadIcon="pi pi-check" :customUpload="true">
                    <template #empty>
                        <p>Drag and drop files to here to upload.</p>
                    </template>
                </FileUpload>
            </div>
        </div>

        <template #footer>
            <Button label="No" icon="pi pi-times" @click="closeDialog" class="p-button-text" />
            <Button label="Yes" icon="pi pi-check" autofocus @click="addFunction" />
        </template>
    </Dialog>
</template>

<script>
import { Function } from "../../service/function";

export default {
    setup() {
        const functions = new Function();
        return { functions };
    },
    async mounted() {
        this.$store.commit("setLoading", true);
        await this.getFunction();
    },
    created() {
        document.title = "ฟังก์ชั่นเพิ่มเติม | Dekrub Shop";
    },
    data: () => ({
        loading: false,
        displayAdd: false,
        displayUpdate: false,

        item_function: [],

        func_type: "",
        func_name: "",
        func_detail: [],
        func_discription: "",
        func_topic: "",

        detail_function: {
            func_type: "",
            func_topic: "",
            func_name: "",
            func_discription: "",
            func_detail: [],
        },

        detail: [],
        id: "",
        img: "https://drive.google.com/uc?export=view&id=",
        img_detail: [],
        index: "",

        type: [
            { name: "Text", code: "text" },
            { name: "Image", code: "image" },
        ],
    }),
    methods: {

        async getFunction() {
            await this.functions
                .GetFunction()
                .then(async (result) => {
                    this.item_function = result.data;
                })
                .catch((err) => {
                    this.$store.commit("setLoading", false);
                    this.$toast.add({
                        severity: "error",
                        summary: "ผิดพลาด",
                        detail: err.response.data.message,
                        life: 3000,
                    });
                });
        },

        async addFunction() {
            this.loading = true;
            this.func_detail.push(this.detail);
            const data = {
                func_type: this.func_type,
                func_name: this.func_name,
                func_detail: this.func_detail,
                func_discription: this.func_discription,
                func_topic: this.func_topic,
            };

            await this.functions.CreateFunction(data).then(async (result) => {
                if (result) {
                    console.log(result);
                    this.loading = false;
                    this.toast.success("เพิ่มข้อมูลฟังก์ชั่นสำเร็จ");
                    setTimeout(() => {
                        window.location.reload();
                    }, 3000);
                }
            });
        },

        async openDialog(item) {
            this.displayUpdate = true;
            this.id = item._id;
            await this.functions
                .GetFunctionById(this.id)
                .then(async (result) => {
                    this.detail_function.func_type = result.data.func_type;
                    this.detail_function.func_name = result.data.func_name;
                    this.detail_function.func_detail = result.data.func_detail;
                    this.detail_function.func_discription = result.data.func_discription;
                    this.detail_function.func_topic = result.data.func_topic;
                })
                .catch((err) => {
                    this.$store.commit("setLoading", false);
                    this.$toast.add({
                        severity: "error",
                        summary: "ผิดพลาด",
                        detail: err.response.data.message,
                        life: 3000,
                    });
                });
        },

        closeDialog() {
            this.func_type = "";
            this.func_name = "";
            this.func_detail = "";
            this.func_discription = "";
            this.func_topic = "";

            this.displayAdd = false;
        },

        async add_img(e) {
            this.img_detail = e.files;
            const formData = new FormData();
            const new_img_detail = this.img_detail.map((item) => item);
            for (let i = 0; i < new_img_detail.length; i++) {
                formData.append("imgCollection", this.img_detail[i]);
            }
            await this.functions
                .putImage(formData)
                .then(async (result) => {
                    // console.log(result.file)
                    const name_img = result.file;
                    const amount = name_img.length;
                    for (let i = 0; i < amount; i++) {
                        this.func_detail.push(name_img[i]);
                    }
                    const data = {
                        func_detail: this.func_detail,
                    };
                    await this.functions.UpdateFunction(data, this.id).then(async (result) => {
                        console.log(result);
                        this.$toast.add({
                            severity: "success",
                            summary: "สำเร็จ",
                            detail: "เพิ่มรูปภาพสำเร็จ",
                            life: 3000,
                        });
                    });
                })
                .catch((err) => {
                    this.$store.commit("setLoading", false);
                    this.$toast.add({
                        severity: "error",
                        summary: "ผิดพลาด",
                        detail: err.response.data.message,
                        life: 3000,
                    });
                });
        },

        async edit_function() {
            this.loading = true;
            if (this.detail_function.func_type === "text") {
                const data = {
                    func_type: this.detail_function.func_type,
                    func_detail: this.detail_function.func_detail,
                    func_discription: this.detail_function.func_discription,
                    func_topic: this.detail_function.func_topic,
                };

                await this.functions.UpdateFunction(data, this.id)
                    .then(async (result) => {
                        if (result) {
                            console.log(result);
                            this.loading = false;
                            this.$toast.add({
                                severity: "success",
                                summary: "สำเร็จ",
                                detail: "แก้ไขฟังก์ชั่นสำเร็จ",
                                life: 3000,
                            });
                            this.displayUpdate = false;
                            this.getFunction(); 
                        }
                    })
                    .catch((err) => {
                        this.$store.commit("setLoading", false);
                        this.$toast.add({
                            severity: "error",
                            summary: "ผิดพลาด",
                            detail: err.response.data.message,
                            life: 3000,
                        });
                    });
            } else if (this.detail_function.func_type === "image") {
                const data = {
                    func_type: this.detail_function.func_type,
                    func_discription: this.detail_function.func_discription,
                    func_topic: this.detail_function.func_topic,
                };

                await this.functions.UpdateFunction(data, this.id)
                    .then(async (result) => {
                        if (result) {
                            console.log(result);
                            this.loading = false;
                            this.$toast.add({
                                severity: "success",
                                summary: "สำเร็จ",
                                detail: "แก้ไขฟังก์ชั่นสำเร็จ",
                                life: 3000,
                            });
                            this.displayUpdate = false;
                            this.getFunction(); 
                        }
                    })
                    .catch((err) => {
                        this.$store.commit("setLoading", false);
                        this.$toast.add({
                            severity: "error",
                            summary: "ผิดพลาด",
                            detail: err.response.data.message,
                            life: 3000,
                        });
                    });
            }
        },

        async deleteimg(item) {
            for (let i in this.detail_function.func_detail) {
                if (this.detail_function.func_detail[i] === item) {
                    this.index = i;
                    break;
                }
            }
            this.detail_function.func_detail.splice(this.index, 1);
            await this.functions
                .DeleteImg(item)
                .then(async (result) => {
                    console.log(result);
                    this.$toast.add({
                        severity: "success",
                        summary: "สำเร็จ",
                        detail: "ลบรูปภาพสำเร็จ",
                        life: 3000,
                    });
                })
                .catch((err) => {
                    this.$store.commit("setLoading", false);
                    this.$toast.add({
                        severity: "error",
                        summary: "ผิดพลาด",
                        detail: err.response.data.message,
                        life: 3000,
                    });
                });
        },
    },
};
</script>
